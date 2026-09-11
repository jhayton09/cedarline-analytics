'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { SubmitButton } from '@/components/ui/Button';
import {
  improvementOptions,
  submitInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryPayload,
} from '@/lib/inquiry';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const emptyPayload: InquiryPayload = { businessEmail: '', businessName: '', improvementArea: '' };

export function InquiryForm() {
  const [payload, setPayload] = useState<InquiryPayload>(emptyPayload);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formId = useId();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const errorBannerRef = useRef<HTMLParagraphElement>(null);
  // Formspree's spam honeypot — a plain, uncontrolled input read only at
  // submit time. Real visitors never see or reach it (see the `hidden`
  // field below); a bot that indiscriminately fills every input on the
  // page will fill this one, and Formspree quietly discards the result.
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus();
    if (status === 'error') errorBannerRef.current?.focus();
  }, [status]);

  const emailErrorId = `${formId}-email-error`;
  const nameErrorId = `${formId}-name-error`;
  const areaErrorId = `${formId}-area-error`;

  if (status === 'success') {
    return (
      <div className="max-w-lg border-t border-line pt-7">
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-[1.1875rem] font-semibold text-ink-900 outline-none"
        >
          Inquiry received.
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-[1.65] text-slate-body">
          Jake will review what you sent and reply by email. If more information is needed to
          understand the problem or define the scope, he’ll ask before anything is agreed or paid.
        </p>
        <p className="mt-3 text-[0.9375rem] font-medium text-ink-900">No payment has been taken.</p>
      </div>
    );
  }

  const clearFieldError = (field: keyof InquiryErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Belt-and-suspenders against double submission: the submit button is
    // already disabled while `status === 'submitting'`, but that disabling
    // only takes effect once React re-renders, so a second Enter/click in
    // that gap is still possible without this early return.
    if (status === 'submitting') return;

    const validation = validateInquiry(payload);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus('submitting');
    const result = await submitInquiry(payload, honeypotRef.current?.value ?? '');
    if (result.ok) {
      setStatus('success');
    } else if (result.fieldErrors) {
      // A mappable, field-specific problem (e.g. Formspree rejects the
      // email format) — surface it the same way a client-side validation
      // error appears, rather than the generic transport-failure banner.
      setErrors(result.fieldErrors);
      setStatus('idle');
    } else {
      setStatus('error');
    }
  };

  const disabled = status === 'submitting';

  return (
    <form noValidate onSubmit={onSubmit} className="max-w-lg">
      {/* Honeypot — hidden from sighted users, screen readers, and the tab
          order alike (`hidden` removes it from all three at once). A human
          filling out this form on a browser will never encounter it. */}
      <input
        ref={honeypotRef}
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        hidden
      />

      {status === 'error' ? (
        <p
          ref={errorBannerRef}
          tabIndex={-1}
          role="alert"
          className="mb-7 border-l-2 border-red-600 py-1 pl-4 text-[0.9375rem] text-red-700 outline-none"
        >
          Your inquiry wasn’t sent. Please try again.
        </p>
      ) : null}

      <div className="border-t border-line pt-5">
        <label htmlFor={`${formId}-email`} className="block text-[0.9375rem] font-medium text-ink-900">
          Business email
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          autoComplete="email"
          value={payload.businessEmail}
          onChange={(event) => {
            setPayload((p) => ({ ...p, businessEmail: event.target.value }));
            clearFieldError('businessEmail');
          }}
          aria-required="true"
          aria-invalid={errors.businessEmail ? 'true' : undefined}
          aria-describedby={errors.businessEmail ? emailErrorId : undefined}
          disabled={disabled}
          className="mt-2 h-11 w-full rounded-md border border-line-strong bg-white px-3.5 text-[0.9375rem] text-ink-900 outline-none transition-colors focus:border-brand-600 disabled:bg-mist-50"
        />
        {errors.businessEmail ? (
          <p id={emailErrorId} className="mt-1.5 text-[0.8125rem] text-red-700">
            {errors.businessEmail}
          </p>
        ) : null}
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <label htmlFor={`${formId}-name`} className="block text-[0.9375rem] font-medium text-ink-900">
          Business name
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="organization"
          value={payload.businessName}
          onChange={(event) => {
            setPayload((p) => ({ ...p, businessName: event.target.value }));
            clearFieldError('businessName');
          }}
          aria-required="true"
          aria-invalid={errors.businessName ? 'true' : undefined}
          aria-describedby={errors.businessName ? nameErrorId : undefined}
          disabled={disabled}
          className="mt-2 h-11 w-full rounded-md border border-line-strong bg-white px-3.5 text-[0.9375rem] text-ink-900 outline-none transition-colors focus:border-brand-600 disabled:bg-mist-50"
        />
        {errors.businessName ? (
          <p id={nameErrorId} className="mt-1.5 text-[0.8125rem] text-red-700">
            {errors.businessName}
          </p>
        ) : null}
      </div>

      {/*
        The divider rule lives on this wrapping div, not the <fieldset> itself:
        a fieldset's default browser border and its legend's straddling of that
        border interact badly with a partial (border-t only) override, leaving
        a stray native border segment next to the legend text. Resetting the
        fieldset to border-0 and keeping the rule external avoids that.
      */}
      <div className="mt-6 border-t border-line pt-5">
        <fieldset className="m-0 min-w-0 border-0 p-0">
          <legend className="p-0 text-[0.9375rem] font-medium text-ink-900">
            What are you trying to improve?
          </legend>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {improvementOptions.map((option) => (
              <label
                key={option.value}
                className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-[0.875rem] transition-colors duration-200 ${
                  payload.improvementArea === option.value
                    ? 'border-ink-900 bg-mist-50 text-ink-900'
                    : 'border-line-strong text-slate-body hover:border-ink-600'
                }`}
              >
                <input
                  type="radio"
                  name={`${formId}-improvement`}
                  value={option.value}
                  checked={payload.improvementArea === option.value}
                  onChange={() => {
                    setPayload((p) => ({ ...p, improvementArea: option.value }));
                    clearFieldError('improvementArea');
                  }}
                  aria-describedby={errors.improvementArea ? areaErrorId : undefined}
                  disabled={disabled}
                  className="h-4 w-4 shrink-0 accent-moss-700"
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors.improvementArea ? (
            <p id={areaErrorId} className="mt-2 text-[0.8125rem] text-red-700">
              {errors.improvementArea}
            </p>
          ) : null}
        </fieldset>
      </div>

      <div className="mt-8">
        <SubmitButton
          type="submit"
          variant="action"
          size="lg"
          disabled={disabled}
          aria-busy={disabled}
          className="w-full sm:w-auto"
        >
          {disabled ? 'Sending…' : 'Send Inquiry'}
        </SubmitButton>
        <p className="mt-3.5 text-[0.8125rem] text-slate-muted">
          Your information is used to respond to your inquiry. See our{' '}
          <Link href="/privacy" className="underline decoration-slate-muted/50 hover:decoration-slate-muted">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
