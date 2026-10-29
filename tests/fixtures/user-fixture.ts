import { test as base, request as apiRequest } from "@playwright/test";
import { generateUser } from "@factories/user-factory";
import { UserRequest } from "@dtos/requests/UserRequest";
import { UserResponse } from "@dtos/responses/UserResponse";
import { createAdminAuth } from "@fixtures/token-fixture";
import { toUserRequest } from "@/mappers/user-mapper";

const API_URL = process.env.API_URL!;

export type RegisteredUser = {
  payload: UserRequest;
  created: UserResponse;
};

type TestFixtures = {
  user: RegisteredUser;
};

type WorkerFixtures = {
  token: ReturnType<typeof createAdminAuth>;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  token: [
    async ({}, use) => {
      const apiContext = await apiRequest.newContext({
        baseURL: API_URL
      });

      try {
        const adminAuth = createAdminAuth(apiContext);

        await use(adminAuth);
      } finally {
        await apiContext.dispose();
      }
    },
    { scope: "worker" }
  ],

  user: async ({ request, token: adminAuth }, use, testInfo) => {
    const payload = toUserRequest(generateUser());

    const response = await request.post(`${API_URL}/users/register`, {
      data: payload
    });

    testInfo.skip(
      !response.ok(),
      `The user could not be registered. Status code returned (${response.status()}): ${await response.text()}`
    );

    const created: UserResponse = await response.json();

    try {
      await use({ payload, created });
    } finally {
      const token = await adminAuth.getToken();

      const deleted = await request.delete(`${API_URL}/users/${created.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!deleted.ok()) {
        throw new Error(
          `User cleanup failed for ID ${created.id} ` +
            `(${deleted.status()}): ${await deleted.text()}`
        );
      }
    }
  }
});
