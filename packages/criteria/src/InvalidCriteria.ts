export class InvalidCriteria extends Error {
	constructor() {
		super("Page size is required when page number is defined");
	}
}
