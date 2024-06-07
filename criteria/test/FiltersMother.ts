import { Filter } from "../src/Filter";
import { Filters } from "../src/Filters";
import { FilterMother } from "./FilterMother";

export class FiltersMother {
	static create(params: Filter[] = []): Filters {
		return new Filters(params.length !== 0 ? params : [FilterMother.create()]);
	}
}
