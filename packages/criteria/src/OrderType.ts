export enum OrderTypes {
	ASC = "ASC",
	DESC = "DESC",
	NONE = "NONE",
}

export class OrderType {
	constructor(public readonly value: OrderTypes) {}

	isNone(): boolean {
		return this.value === OrderTypes.NONE;
	}
}
