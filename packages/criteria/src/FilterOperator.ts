export enum Operator {
	EQUAL = "=",
	NOT_EQUAL = "!=",
	GREATER_THAN = ">",
	GREATER_THAN_OR_EQUAL = ">=",
	LOWER_THAN = "<",
	LOWER_THAN_OR_EQUAL = "<=",
	CONTAINS = "CONTAINS",
	NOT_CONTAINS = "NOT_CONTAINS",
}

export class FilterOperator {
	constructor(public readonly value: Operator) {}

	isContains(): boolean {
		return this.value.valueOf() === Operator.CONTAINS.valueOf();
	}

	isNotContains(): boolean {
		return this.value.valueOf() === Operator.NOT_CONTAINS.valueOf();
	}

	isNotEquals(): boolean {
		return this.value.valueOf() === Operator.NOT_EQUAL.valueOf();
	}

	isGreaterThan(): boolean {
		return this.value.valueOf() === Operator.GREATER_THAN.valueOf();
	}

	isGreaterThanOrEqual(): boolean {
		return this.value.valueOf() === Operator.GREATER_THAN_OR_EQUAL.valueOf();
	}

	isLowerThan(): boolean {
		return this.value.valueOf() === Operator.LOWER_THAN.valueOf();
	}

	isLowerThanOrEqual(): boolean {
		return this.value.valueOf() === Operator.LOWER_THAN_OR_EQUAL.valueOf();
	}
}
