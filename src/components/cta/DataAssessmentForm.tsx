"use client";

import { useState } from "react";
import { FormButton } from "@/components/Button";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border border-stone bg-white px-4 py-3 text-ink outline-none focus:border-ink";
const labelClass = "mb-2 block text-sm font-medium text-ink";

export function DataAssessmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
      setShowDetails(false);
    } catch {
      setStatus("error");
      setError("Unable to send right now. Please try again shortly.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-stone bg-neutral p-8 md:p-10" role="status">
        <p className="eyebrow mb-3">Received</p>
        <h2 className="display display-md mb-3">Thank you</h2>
        <p className="lead !max-w-none">
          We received your request. We will follow up to confirm what to send,
          how it is handled, and the turnaround for your assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className={labelClass}>
          Organization
        </label>
        <input id="organization" name="organization" required autoComplete="organization" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What are you trying to find in your data?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Your scientific objective and what your current workflow is leaving out."
          className={`${inputClass} resize-y`}
        />
      </div>

      {!showDetails ? (
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="arrow-link"
        >
          Add project details for faster triage{" "}
          <span className="arrow-ne">↓</span>
        </button>
      ) : (
        <fieldset className="space-y-6 border-t border-stone pt-6">
          <legend className="eyebrow mb-2">Project details (optional)</legend>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="researchArea" className={labelClass}>
                Research area
              </label>
              <input id="researchArea" name="researchArea" className={inputClass} />
            </div>
            <div>
              <label htmlFor="instrumentVendor" className={labelClass}>
                Instrument vendor
              </label>
              <input id="instrumentVendor" name="instrumentVendor" placeholder="Thermo, SCIEX, Agilent, Waters, Bruker" className={inputClass} />
            </div>
            <div>
              <label htmlFor="instrumentModel" className={labelClass}>
                Instrument model
              </label>
              <input id="instrumentModel" name="instrumentModel" className={inputClass} />
            </div>
            <div>
              <label htmlFor="samplesPerStudy" className={labelClass}>
                Samples per study
              </label>
              <input id="samplesPerStudy" name="samplesPerStudy" placeholder="Approximate" className={inputClass} />
            </div>
            <div>
              <label htmlFor="sampleMatrix" className={labelClass}>
                Sample matrix
              </label>
              <input id="sampleMatrix" name="sampleMatrix" placeholder="Serum, water, tissue, plant" className={inputClass} />
            </div>
            <div>
              <label htmlFor="dataVolume" className={labelClass}>
                Data volume
              </label>
              <input id="dataVolume" name="dataVolume" placeholder="Approximate size" className={inputClass} />
            </div>
            <div>
              <label htmlFor="currentSoftware" className={labelClass}>
                Current software
              </label>
              <input id="currentSoftware" name="currentSoftware" placeholder="XCMS, MZmine, MS-DIAL, vendor" className={inputClass} />
            </div>
            <div>
              <label htmlFor="timeline" className={labelClass}>
                Timeline
              </label>
              <input id="timeline" name="timeline" className={inputClass} />
            </div>
          </div>
        </fieldset>
      )}

      {/* Honeypot */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p className="text-sm text-ink" role="alert">
          {error}
        </p>
      ) : null}

      <FormButton disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request a dataset assessment"}
      </FormButton>
    </form>
  );
}
