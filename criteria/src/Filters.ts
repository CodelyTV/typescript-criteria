import { Filter, FiltersPrimitives } from "./Filter";

export class Filters {
	constructor(public readonly value: Filter[]) {}

	static fromPrimitives(filters: FiltersPrimitives[]): Filters {
		return new Filters(
			filters.map((filter) => Filter.fromPrimitives(filter.field, filter.operator, filter.value)),
		);
	}

	toPrimitives(): FiltersPrimitives[] {
		return this.value.map((filter) => filter.toPrimitives());
	}

	isEmpty(): boolean {
		return this.value.length === 0;
	}
}
