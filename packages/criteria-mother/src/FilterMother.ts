import { Filter, FiltersPrimitives, Operator } from "@codely/criteria";
import { faker } from "@faker-js/faker";

export class FilterMother {
	static create(params?: Partial<FiltersPrimitives>): Filter {
		const randomOperator =
			Object.values(Operator)[Math.floor(Math.random() * Object.values(Operator).length)];

		const primitives: FiltersPrimitives = {
			field: faker.string.alpha(10),
			operator: randomOperator,
			value: faker.string.alpha(10),
			...params,
		};

		return Filter.fromPrimitives(primitives.field, primitives.operator, primitives.value);
	}
}
