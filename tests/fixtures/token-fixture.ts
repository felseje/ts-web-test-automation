import type { APIRequestContext } from "@playwright/test";

const API_URL = process.env.API_URL!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export function createAdminAuth(request: APIRequestContext) {
  let token = "";
  let expiresAt = 0;

  async function login(): Promise<void> {
    const response = await request.post(`${API_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      }
    });

    if (!response.ok()) {
      throw new Error(
        `Admin login failed (${response.status()}): ${await response.text()}`
      );
    }

    const body: {
      access_token: string;
      expires_in: number;
    } = await response.json();

    if (!body.access_token || !body.expires_in) {
      throw new Error("Admin login returned an invalid token response.");
    }

    token = body.access_token;

    expiresAt = Date.now() + body.expires_in * 1000 - 30_000;
  }

  async function getToken(): Promise<string> {
    if (!token || Date.now() >= expiresAt) {
      await login();
    }

    return token;
  }

  return { getToken };
}
