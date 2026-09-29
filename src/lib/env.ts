const PLACEHOLDER = /x{4,}|YOUR_PROJECT|your_service_role_key/i;

/** Real env values only. Example placeholders in `.env.example` count as unset. */
export function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  if (!value || PLACEHOLDER.test(value)) return undefined;
  return value;
}
