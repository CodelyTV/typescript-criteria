import assert from "node:assert";
import { describe, it } from "node:test";

import { CriteriaMother } from "@codelytv/criteria-test-mother";
import { NextRequest } from "next/server";

import { CriteriaFromNextRequestConverter } from "../src/CriteriaFromNextRequestConverter";

describe("CriteriaFromNextRequestConverter should", () => {
	const converter = new CriteriaFromNextRequestConverter();

	it("Converts a url with one filter", () => {
		const url = new URL(
			"http://localhost:3000/api/users?filters[0][field]=name&filters[0][operator]=CONTAINS&filters[0][value]=Javi",
		);
		const request = new NextRequest(url);

		const expectedCriteria = CriteriaMother.withOneFilter("name", "CONTAINS", "Javi");

		assert.deepEqual(converter.toCriteria(request), expectedCriteria);
	});

	it("Converts a url with multiple filters", () => {
		const url = new URL(
			"http://localhost:3000/api/users?filters[0][field]=name&filters[0][operator]=CONTAINS&filters[0][value]=Javi&filters[1][field]=email&filters[1][operator]=CONTAINS&filters[1][value]=gmail",
		);
		const request = new NextRequest(url);

		const expectedCriteria = CriteriaMother.create({
			filters: [
				{
					field: "name",
					operator: "CONTAINS",
					value: "Javi",
				},
				{
					field: "email",
					operator: "CONTAINS",
					value: "gmail",
				},
			],
			orderBy: null,
			orderType: null,
			pageSize: null,
			pageNumber: null,
		});

		assert.deepEqual(converter.toCriteria(request), expectedCriteria);
	});

	it("Converts a url with multiple filters order and pagination", () => {
		const url = new URL(
			"http://localhost:3000/api/users" +
				"?filters[0][field]=name&filters[0][operator]=CONTAINS&filters[0][value]=Javi" +
				"&filters[1][field]=email&filters[1][operator]=CONTAINS&filters[1][value]=gmail",
		);
		const request = new NextRequest(url);

		const expectedCriteria = CriteriaMother.create({
			filters: [
				{
					field: "name",
					operator: "CONTAINS",
					value: "Javi",
				},
				{
					field: "email",
					operator: "CONTAINS",
					value: "gmail",
				},
			],
			orderBy: null,
			orderType: null,
			pageSize: null,
			pageNumber: null,
		});

		assert.deepEqual(converter.toCriteria(request), expectedCriteria);
	});

	it("Converts a url with multiple filters order and pagination", () => {
		const url = new URL(
			"http://localhost:3000/api/users" +
				"?filters[0][field]=name&filters[0][operator]=CONTAINS&filters[0][value]=Javi" +
				"&filters[1][field]=email&filters[1][operator]=CONTAINS&filters[1][value]=gmail" +
				"&orderBy=name&order=ASC" +
				"&pageSize=10&pageNumber=2",
		);
		const request = new NextRequest(url);

		const expectedCriteria = CriteriaMother.create({
			filters: [
				{
					field: "name",
					operator: "CONTAINS",
					value: "Javi",
				},
				{
					field: "email",
					operator: "CONTAINS",
					value: "gmail",
				},
			],
			orderBy: "name",
			orderType: "ASC",
			pageSize: 10,
			pageNumber: 2,
		});

		assert.deepEqual(converter.toCriteria(request), expectedCriteria);
	});
});
