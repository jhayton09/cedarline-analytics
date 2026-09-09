/**
 * Inquiry form data model, validation, and submission transport.
 *
 * The validation function doubles as what the transport (and, ultimately,
 * Formspree) should also enforce — the client calling it first is a UX
 * convenience, not a substitute for server-side validation.
 */

export const improvementOptions = [
  { value: 'reporting', label: 'Reporting' },
  { value: 'forecasting', label: 'Forecasting' },
  { value: 'spreadsheet-process', label: 'Spreadsheet / process' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export type ImprovementArea = (typeof improvementOptions)[number]['value'];

export type InquiryPayload = {
  businessEmail: string;
  businessName: string;
  improvementArea: ImprovementArea | '';
};

export type InquiryErrors = Partial<Record<keyof InquiryPayload, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(payload: InquiryPayload): InquiryErrors {
  const errors: InquiryErrors = {};

  const email = payload.businessEmail.trim();
  if (!email) errors.businessEmail = 'Enter a business email.';
  else if (!EMAIL_PATTERN.test(email)) errors.businessEmail = 'Enter a valid email address.';

  if (!payload.businessName.trim()) errors.businessName = 'Enter a business name.';

  if (!payload.improvementArea) errors.improvementArea = 'Choose what you’re trying to improve.';

  return errors;
}

/** Same wording validateInquiry() uses, so a field error mapped back from the
 *  transport reads identically to a client-side one — see submitInquiry(). */
const FIELD_ERROR_MESSAGE: Record<keyof InquiryErrors, string> = {
  businessEmail: 'Enter a valid email address.',
  businessName: 'Enter a business name.',
  improvementArea: 'Choose what you’re trying to improve.',
};

export type InquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: InquiryErrors };

/** Shown to the user for any transport-level failure. Never the provider's raw message. */
const GENERIC_FAILURE = 'Your inquiry wasn’t sent. Please try again.';

/**
 * Formspree endpoint for the inquiry form. This id is intentionally public —
 * Formspree endpoints are meant to be embedded in client-side code, the same
 * way a mailto address is. It is not a secret and carries no credential.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyeyldzj';

/** The exact wording Formspree's email notification shows, not the internal slug. */
function improvementLabel(value: InquiryPayload['improvementArea']): string {
  return improvementOptions.find((option) => option.value === value)?.label ?? '';
}

/** Formspree's documented field-level validation-error shape (POST with Accept: application/json). */
type FormspreeErrorBody = { errors?: { field?: string; message?: string }[] };

/** Only these three submitted field names are ever mapped back to a local field error. */
const FORMSPREE_FIELD_TO_LOCAL: Record<string, keyof InquiryErrors> = {
  email: 'businessEmail',
  business_name: 'businessName',
  improvement_category: 'improvementArea',
};

/**
 * Submission transport: a real POST to Formspree.
 *
 * Sends only the three fields the visitor intentionally provided (plus an
 * empty honeypot field Formspree already knows how to act on — see below).
 * No phone number, no IP/browser enrichment, no analytics identifiers, and
 * no marketing subscription of any kind.
 *
 * `Accept: application/json` asks Formspree to return a JSON response
 * instead of redirecting the browser to a Formspree-hosted thank-you page,
 * so the site keeps its own inline success/failure states.
 *
 * NOTE for the Privacy Policy (not finalized in this pass): from this point
 * on, inquiry submissions are transmitted to Formspree, which acts as the
 * form-processing service that relays them to Jake's inbox. That fact must
 * be disclosed in the final Privacy Policy before production deployment.
 */
export async function submitInquiry(payload: InquiryPayload, honeypot = ''): Promise<InquiryResult> {
  const body = {
    email: payload.businessEmail.trim(),
    business_name: payload.businessName.trim(),
    improvement_category: improvementLabel(payload.improvementArea),
    // Formspree's documented spam honeypot: a field real visitors never
    // fill in. If a bot fills it, Formspree discards the submission quietly
    // while still responding as usual — nothing extra to handle here.
    _gotcha: honeypot,
  };

  let response: Response;
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Network failure (offline, DNS, blocked request, etc.) — never surface the raw error.
    return { ok: false, error: GENERIC_FAILURE };
  }

  if (response.ok) return { ok: true };

  const fieldErrors: InquiryErrors = {};
  try {
    const parsed = (await response.json()) as FormspreeErrorBody;
    for (const fieldError of parsed.errors ?? []) {
      const localField = fieldError.field ? FORMSPREE_FIELD_TO_LOCAL[fieldError.field] : undefined;
      if (localField) fieldErrors[localField] = FIELD_ERROR_MESSAGE[localField];
    }
  } catch {
    // Non-JSON or empty error body — fall through to the generic failure below.
  }

  return Object.keys(fieldErrors).length > 0
    ? { ok: false, error: GENERIC_FAILURE, fieldErrors }
    : { ok: false, error: GENERIC_FAILURE };
}
