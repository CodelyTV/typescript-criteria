import assert from "node:assert";
import { describe, it } from "node:test";

import { faker } from "@faker-js/faker";

import { Criteria, Filters, InvalidCriteria, Order } from "../src";

describe("Criteria", () => {
	it("should throw an error when the page number is defined but page size isn't", () => {
		assert.throws(
			() =>
				new Criteria(new Filters([]), Order.none(), null, faker.number.int({ min: 1, max: 100 })),
			new InvalidCriteria(),
		);
	});
});
