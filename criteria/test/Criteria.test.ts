import assert from "node:assert";
import { describe, it } from "node:test";

import { faker } from "@faker-js/faker";

import { InvalidCriteria } from "../src/InvalidCriteria";
import { CriteriaMother } from "./CriteriaMother";

describe("Criteria", () => {
	it("should throw an error when the page number is defined but page size isn't", () => {
		assert.throws(
			() =>
				CriteriaMother.create({
					pageNumber: faker.number.int({ min: 1, max: 100 }),
					pageSize: null,
				}),
			new InvalidCriteria(),
		);
	});
});
