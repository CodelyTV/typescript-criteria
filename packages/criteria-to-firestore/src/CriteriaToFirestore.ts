import { Criteria, Filter, OrderTypes } from "@codelytv/criteria";
import { limit, orderBy, QueryConstraint, startAfter, where } from "@firebase/firestore";

type CriteriaMapper = Record<string, (v: string) => string | number>;

export class CriteriaToFirestoreConverter {
	convert(criteria: Criteria, mapper: CriteriaMapper = {}): QueryConstraint[] {
		const constraints: QueryConstraint[] = [];
		if (criteria.hasFilters()) {
			criteria.filters.value.forEach((filter) => {
				const constraint = this.getFilterFromCriteria(filter, mapper);
				if (constraint) {
					constraints.push(constraint);
				}
			});
		}
		if (criteria.hasOrder() && !criteria.order.isNone()) {
			constraints.push(this.getOrderFromCriteria(criteria));
		}
		if (criteria.pageSize !== null) {
			constraints.push(limit(criteria.pageSize));
		}
		if (criteria.pageNumber !== null && criteria.pageSize !== null) {
			constraints.push(startAfter(criteria.pageSize * (criteria.pageNumber - 1)));
		}

		return constraints;
	}

	private getOrderFromCriteria(criteria: Criteria) {
		const by = criteria.order.orderBy.value;
		const orderType = criteria.order.orderType.value === OrderTypes.DESC ? "desc" : "asc";

		return orderBy(by, orderType);
	}

	private getFilterFromCriteria(filter: Filter, mapper: CriteriaMapper) {
		const field = filter.field.value;
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const value = mapper[field] ? mapper[field](filter.value.value) : filter.value.value;

		if (filter.operator.isContains()) {
			return where(field, "in", value);
		}
		if (filter.operator.isNotContains()) {
			return where(field, "not-in", value);
		}
		if (filter.operator.value.valueOf() === "=") {
			return where(field, "==", value);
		}
		if (filter.operator.isNotEquals()) {
			return where(field, "!=", value);
		}
		if (filter.operator.isGreaterThan()) {
			return where(field, ">", value);
		}
		if (filter.operator.isGreaterThanOrEqual()) {
			return where(field, ">=", value);
		}
		if (filter.operator.isLowerThan()) {
			return where(field, "<", value);
		}
		if (filter.operator.isLowerThanOrEqual()) {
			return where(field, "<=", value);
		}
	}
}
