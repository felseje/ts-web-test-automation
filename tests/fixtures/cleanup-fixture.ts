import { test as base } from "@playwright/test";
import { createAdminAuth } from "@fixtures/token-fixture";

const API_URL = process.env.API_URL!;

type CleanupItem = {
  type: "user";
  id: string;
};

type CleanupRegistry = {
  add(item: CleanupItem): void;
};

type TestFixtures = {
  cleanup: CleanupRegistry;
};

type WorkerFixtures = {
  token: ReturnType<typeof createAdminAuth>;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  cleanup: async ({ request, token: adminAuth }, use) => {
    const items: CleanupItem[] = [];

    await use({
      add: (item) => items.push(item)
    });

    if (items.length === 0) return;

    const token = await adminAuth.getToken();
    const errors: Error[] = [];
    const reversedItems = [...items].reverse();

    await reversedItems.reduce(
      (previous, { type, id }) =>
        previous.then(async () => {
          try {
            if (type === "user") {
              const response = await request.delete(`${API_URL}/users/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              if (!response.ok()) {
                throw new Error(
                  `User cleanup failed for ID ${id} ` +
                    `(${response.status()}): ${await response.text()}`
                );
              }
            }
          } catch (error) {
            errors.push(
              error instanceof Error ? error : new Error(String(error))
            );
          }
        }),
      Promise.resolve()
    );

    if (errors.length > 0) {
      throw new AggregateError(
        errors,
        "One or more cleanup operations failed."
      );
    }
  }
});
