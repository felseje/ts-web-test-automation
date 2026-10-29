import { mergeTests as merge } from "@playwright/test";
import { test as pageTest } from "@fixtures/page-fixture";
import { test as userTest } from "@fixtures/user-fixture";
import { test as cleanup } from "@fixtures/cleanup-fixture";
import { test as screenshot } from "@fixtures/screenshot-fixture";

export const test = merge(pageTest, userTest, cleanup, screenshot);
export { expect } from "@playwright/test";
