import assert from "node:assert";
import { describe, it } from "node:test";

import { CriteriaMother } from "@codelytv/criteria-test-mother";

import { CriteriaToMySqlConverter } from "../src";

describe("CriteriaToMySqlConverter should", () => {
	const converter = new CriteriaToMySqlConverter();

	it("Generate simple select with an empty criteria", () => {
		const actualQuery = converter.convert(["id", "name"], "users", CriteriaMother.empty());

		assert.deepEqual(actualQuery, { query: "SELECT id, name FROM users;", params: [] });
	});

	it("Generate select with order", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptySorted("id", "DESC"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users ORDER BY ? ?;",
			params: ["id", "DESC"],
		});
	});

	it("Generate select with one filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "EQUAL", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name = ?;",
			params: ["Javier"],
		});
	});

	it("Generate select with one greater than filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "GREATER_THAN", "25"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, age FROM users WHERE age > ?;",
			params: [25],
		});
	});

	it("Generate select with one greater than or equal filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "GREATER_THAN_OR_EQUAL", "25"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, age FROM users WHERE age >= ?;",
			params: [25],
		});
	});

	it("Generate select with one lower than filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "LOWER_THAN", "18"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, age FROM users WHERE age < ?;",
			params: [18],
		});
	});

	it("Generate select with one lower than or equal filter", () => {
		const actualQuery = converter.convert(
			["id", "age"],
			"users",
			CriteriaMother.withOneFilter("age", "LOWER_THAN_OR_EQUAL", "18"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, age FROM users WHERE age <= ?;",
			params: [18],
		});
	});

	it("Generate select with one filter sorted", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name = ? ORDER BY ? ?;",
			params: ["Javier", "id", "DESC"],
		});
	});

	it("Generate select with multiples filters", () => {
		const actualQuery = converter.convert(
			["id", "name", "email"],
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

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name, email FROM users WHERE name = ? AND email = ?;",
			params: ["Javier", "javier@terra.es"],
		});
	});

	it("Generate select with multiples filters and sort", () => {
		const actualQuery = converter.convert(
			["id", "name", "email"],
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

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name, email FROM users WHERE name = ? AND email = ? ORDER BY ? ?;",
			params: ["Javier", "javier@terra.es", "id", "DESC"],
		});
	});

	it("Generate select with one contains filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name LIKE ?;",
			params: ["%Javier%"],
		});
	});

	it("Generate select with one not contains filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name NOT LIKE ?;",
			params: ["%Javier%"],
		});
	});

	it("Generate simple select paginated", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.emptyPaginated(10, 3),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users LIMIT ? OFFSET ?;",
			params: [10, 20],
		});
	});

	it("Generate select with not contains filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name NOT LIKE ?;",
			params: ["%Javier%"],
		});
	});

	it("Generate select with not equals filter", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("name", "NOT_EQUAL", "Javier"),
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name != ?;",
			params: ["Javier"],
		});
	});

	it("Generate select with one filter with a different name in the query", () => {
		const actualQuery = converter.convert(
			["id", "name"],
			"users",
			CriteriaMother.withOneFilter("fullname", "EQUAL", "Javier"),
			{ fullname: "name" },
		);

		assert.deepEqual(actualQuery, {
			query: "SELECT id, name FROM users WHERE name = ?;",
			params: ["Javier"],
		});
	});
});
