/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Criteria, FiltersPrimitives } from "@codelytv/criteria";
import { CriteriaFromUrlConverter } from "@codelytv/criteria-from-url";
import { NextRequest } from "next/server";

export class CriteriaFromNextRequestConverter {
	private readonly urlConverter: CriteriaFromUrlConverter;

	constructor() {
		this.urlConverter = new CriteriaFromUrlConverter();
	}

	public toCriteria(request: NextRequest): Criteria {
		const url = new URL(request.url);

		return this.urlConverter.toCriteria(url);
	}

	public toFiltersPrimitives(request: NextRequest): FiltersPrimitives[] {
		const url = new URL(request.url);

		return this.urlConverter.toFiltersPrimitives(url);
	}
}
