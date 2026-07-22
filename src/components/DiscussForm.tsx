"use client";

import { useState } from "react";
import { FormButton } from "./Button";
import { interestLabels, type DiscussInput } from "@/lib/validations";

type Status = "idle" | "loading" | "success" | "error";

const interests = Object.entries(interestLabels) as [
  DiscussInput["interest"],
  string,
][];

export function DiscussForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      interest: String(data.get("interest") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/discuss", {
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
    } catch {
      setStatus("error");
      setError("Unable to send right now. Please try again shortly.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="border border-stone bg-neutral p-8 md:p-10"
        role="status"
      >
        <p className="eyebrow mb-3">Received</p>
        <h2 className="display display-md mb-3">Thank you</h2>
        <p className="lead !max-w-none">
          We received your project details and will follow up soon to define the
          right path forward.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <Field
        label="Organization"
        name="organization"
        required
        autoComplete="organization"
      />

      <div>
        <label htmlFor="interest" className="mb-2 block text-sm font-medium text-ink">
          Interest
        </label>
        <select
          id="interest"
          name="interest"
          required
          defaultValue=""
          className="w-full border border-stone bg-white px-4 py-3 text-ink outline-none focus:border-strawberry"
        >
          <option value="" disabled>
            Select one
          </option>
          {interests.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your scientific objective, samples, existing data, and desired outputs."
          className="w-full resize-y border border-stone bg-white px-4 py-3 text-ink outline-none focus:border-strawberry"
        />
      </div>

      {}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p className="text-sm" style={{ color: "var(--color-strawberry)" }} role="alert">
          {error}
        </p>
      ) : null}

      <FormButton disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Discuss Your Project"}
      </FormButton>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full border border-stone bg-white px-4 py-3 text-ink outline-none focus:border-strawberry"
      />
    </div>
  );
}
