export function validateEnv(...variables: string[]): void {
  const missing = variables.filter((name) => !process.env[name]?.trim());

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}
