import assert from "node:assert";
import { describe, it } from "node:test";

import { CriteriaMother } from "@codelytv/criteria-test-mother";

import { CriteriaToMongoConverter } from "../src";

describe("CriteriaToMongoConverter should", () => {
	const converter = new CriteriaToMongoConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert(CriteriaMother.empty());

		assert.deepEqual(actualQuery, { filter: {} });
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert(CriteriaMother.emptySorted("_id", "DESC"));

		assert.deepEqual(actualQuery, {
			filter: {},
			sort: { _id: -1 },
		});
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(CriteriaMother.withOneFilter("name", "EQUAL", "Javier"));

		assert.deepEqual(actualQuery, {
			filter: { name: { $eq: "Javier" } },
		});
	});

	it("Generate select with one greater than filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("age", "GREATER_THAN", "25"),
		);

		assert.deepEqual(actualQuery, {
			filter: { age: { $gt: 25 } },
		});
	});

	it("Generate select with one greater than or equal filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("age", "GREATER_THAN_OR_EQUAL", "25"),
		);

		assert.deepEqual(actualQuery, {
			filter: { age: { $gte: 25 } },
		});
	});

	it("Generate select with one lower than filter", () => {
		const actualQuery = converter.convert(CriteriaMother.withOneFilter("age", "LOWER_THAN", "18"));

		assert.deepEqual(actualQuery, {
			filter: { age: { $lt: 18 } },
		});
	});

	it("Generate select with one lower than or equal filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("age", "LOWER_THAN_OR_EQUAL", "18"),
		);

		assert.deepEqual(actualQuery, {
			filter: { age: { $lte: 18 } },
		});
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "_id", "DESC"),
		);

		assert.deepEqual(actualQuery, {
			filter: { name: { $eq: "Javier" } },
			sort: { _id: -1 },
		});
	});

	it("Generate select with multiples filters", () => {
		const actualQuery = converter.convert(
			CriteriaMother.create({
				filters: [
					{
						field: "name",
						operator: "EQUAL",
						value: "Javier",
					},
					{
						field: "email",
						operator: "EQUAL",
						value: "javier@terra.es",
					},
				],
				orderBy: null,
				orderType: null,
				pageSize: null,
				pageNumber: null,
			}),
		);

		assert.deepEqual(actualQuery, {
			filter: {
				name: { $eq: "Javier" },
				email: { $eq: "javier@terra.es" },
			},
		});
	});

	it("Generate select with multiples filters and sort", () => {
		const actualQuery = converter.convert(
			CriteriaMother.create({
				filters: [
					{
						field: "name",
						operator: "EQUAL",
						value: "Javier",
					},
					{
						field: "email",
						operator: "EQUAL",
						value: "javier@terra.es",
					},
				],
				orderBy: "_id",
				orderType: "DESC",
				pageSize: null,
				pageNumber: null,
			}),
		);

		assert.deepEqual(actualQuery, {
			filter: {
				name: { $eq: "Javier" },
				email: { $eq: "javier@terra.es" },
			},
			sort: { _id: -1 },
		});
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			filter: { name: { $regex: "Javier" } },
		});
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			filter: { name: { $not: { $regex: "Javier" } } },
		});
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert(CriteriaMother.emptyPaginated(10, 3));

		assert.deepEqual(actualQuery, {
			filter: {},
			limit: 10,
			skip: 20,
		});
	});

	it("Generate select with not equal filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "NOT_EQUAL", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			filter: { name: { $ne: "Javier" } },
		});
	});
});
