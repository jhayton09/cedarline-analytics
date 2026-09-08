/**
 * Inquiry form data model, validation, and submission transport.
 *
 * The validation function is written to double as what a future server-side
 * handler should also check — the client calling it first is a UX
 * convenience, not a substitute for re-validating on whatever transport
 * eventually receives this payload.
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

export type InquiryResult = { ok: true } | { ok: false; error: string };

/**
 * Submission transport — V2 DEVELOPMENT BRANCH ONLY.
 *
 * No real delivery mechanism is connected yet. This function does not call
 * any external service, form provider, or API route: no network request
 * leaves the browser and no submitted data is sent anywhere. It only
 * simulates the round trip (including latency) so the loading, success, and
 * failure states can be built and reviewed against something.
 *
 * Before this form can be considered production-ready, replace this
 * implementation with a real transport (e.g. a server route that validates
 * the payload again and forwards it to email or a CRM). Nothing else in
 * InquiryForm needs to change — it only depends on this function's shape.
 */
export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  // A deliberate, code-controlled way to exercise the failure state during
  // local review without a real backend to fail against. Nothing in the UI
  // advertises this — it only reacts to a specific value a reviewer enters
  // on purpose (e.g. to screenshot the error state).
  if (payload.businessEmail.trim().toLowerCase() === 'fail@test.dev') {
    return { ok: false, error: 'Simulated failure — development transport only.' };
  }

  return { ok: true };
}
