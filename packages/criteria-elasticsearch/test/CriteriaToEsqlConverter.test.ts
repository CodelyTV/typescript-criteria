import assert from "node:assert";
import { describe, it } from "node:test";

import { CriteriaMother } from "@codely/criteria-mother";

import { CriteriaToEsqlConverter } from "../src";

describe("CriteriaToEsqlConverter should", () => {
	const converter = new CriteriaToEsqlConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert("users", CriteriaMother.empty());

		assert.equal(actualQuery, "FROM users");
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert("users", CriteriaMother.emptySorted("id", "DESC"));

		assert.equal(actualQuery, "FROM users | SORT id DESC");
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		assert.equal(actualQuery, `FROM users | WHERE name = "Javier"`);
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		assert.equal(actualQuery, `FROM users | WHERE name = "Javier" | SORT id DESC`);
	});

	it("Generate select with multiples filters", () => {
		const actualQuery = converter.convert(
			"users",
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

		assert.equal(actualQuery, `FROM users | WHERE name = "Javier" AND email = "javier@terra.es"`);
	});

	it("Generate select with multiples filters and sort", () => {
		const actualQuery = converter.convert(
			"users",
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
				orderBy: "id",
				orderType: "DESC",
				pageSize: null,
				pageNumber: null,
			}),
		);

		assert.equal(
			actualQuery,
			`FROM users | WHERE name = "Javier" AND email = "javier@terra.es" | SORT id DESC`,
		);
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		assert.equal(actualQuery, `FROM users | WHERE name LIKE "*Javier*"`);
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		assert.equal(actualQuery, `FROM users | WHERE name NOT LIKE "*Javier*"`);
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert("users", CriteriaMother.emptyPaginated(10, 3));

		assert.equal(actualQuery, "FROM users | LIMIT 10");
	});
});
