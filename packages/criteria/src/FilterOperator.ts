export enum Operator {
	EQUAL = "=",
	NOT_EQUAL = "!=",
	GT = ">",
	LT = "<",
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
}
