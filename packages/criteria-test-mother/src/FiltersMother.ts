import { Filter, Filters } from "@codelytv/criteria";

import { FilterMother } from "./FilterMother";

export class FiltersMother {
	static create(params: Filter[] = []): Filters {
		return new Filters(params.length !== 0 ? params : [FilterMother.create()]);
	}
}