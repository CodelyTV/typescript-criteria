import assert from "node:assert";
import { describe, it } from "node:test";

import { CriteriaMother } from "@codelytv/criteria-test-mother";
import { limit, orderBy, startAfter, where } from "@firebase/firestore";

import { CriteriaToFirestoreConverter } from "../src";

describe("CriteriaToFirestoreConverter should", () => {
	const converter = new CriteriaToFirestoreConverter();

	it("Generate simple query with an empty criteria", () => {
		const actualQuery = converter.convert(CriteriaMother.empty());

		assert.deepEqual(actualQuery, []);
	});

	it("Generate query with order", () => {
		const actualQuery = converter.convert(CriteriaMother.emptySorted("id", "DESC"));

		assert.deepEqual(actualQuery, [orderBy("id", "desc")]);
	});

	it("Generate query with one filter", () => {
		const actualQuery = converter.convert(CriteriaMother.withOneFilter("name", "EQUAL", "Javier"));

		assert.deepEqual(actualQuery, [where("name", "==", "Javier")]);
	});

	it("Generate query with one filter sorted", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilterSorted("name", "EQUAL", "Javier", "id", "DESC"),
		);

		assert.deepEqual(actualQuery, [where("name", "==", "Javier"), orderBy("id", "desc")]);
	});

	it("Generate query with multiples filters", () => {
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

		assert.deepEqual(actualQuery, [
			where("name", "==", "Javier"),
			where("email", "==", "javier@terra.es"),
		]);
	});

	it("Generate query with multiples filters and sort", () => {
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
				orderBy: "id",
				orderType: "DESC",
				pageSize: null,
				pageNumber: null,
			}),
		);

		assert.deepEqual(actualQuery, [
			where("name", "==", "Javier"),
			where("email", "==", "javier@terra.es"),
			orderBy("id", "desc"),
		]);
	});

	it("Generate query with one contains filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, [where("name", "in", "Javier")]);
	});

	it("Generate query with one greater filter and value converter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("age", "GREATER_THAN", "20"),
			{ age: (v) => parseInt(v, 10) },
		);

		assert.deepEqual(actualQuery, [where("age", ">", 20)]);
	});

	it("Generate query with one not contains filter", () => {
		const actualQuery = converter.convert(
			CriteriaMother.withOneFilter("name", "NOT_CONTAINS", "Javier"),
		);

		assert.deepEqual(actualQuery, [where("name", "not-in", "Javier")]);
	});

	it("Generate simple query paginated", () => {
		const pageSize = 10;
		const pageNumber = 3;
		const expectedSkip = pageSize * (pageNumber - 1);
		const actualQuery = converter.convert(CriteriaMother.emptyPaginated(pageSize, pageNumber));

		assert.deepEqual(actualQuery, [limit(pageSize), startAfter(expectedSkip)]);
	});
});
