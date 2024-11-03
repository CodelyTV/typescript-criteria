import { Criteria, Filter, OrderTypes } from "@codelytv/criteria";

type MongoFilterOperator = "$eq" | "$ne" | "$gt" | "$gte" | "$lt" | "$lte" | "$regex";
type MongoFilterOperation = {
	[operator in MongoFilterOperator]?: unknown;
};

type MongoFilter =
	| {
			[field: string]: MongoFilterOperation;
	  }
	| {
			[field: string]: { $not: MongoFilterOperation };
	  };

type MongoSortDirection = 1 | -1;

type MongoSort = {
	[field: string]: MongoSortDirection;
};

export type MongoQuery = {
	filter: MongoFilter;
	sort?: MongoSort;
	skip?: number;
	limit?: number;
};

export class CriteriaToMongoConverter {
	convert(criteria: Criteria): MongoQuery {
		const query: MongoQuery = {
			filter: {},
		};

		if (criteria.hasFilters()) {
			query.filter = criteria.filters.value.reduce((acc, filter) => {
				return { ...acc, ...this.generateMongoFilter(filter) };
			}, {});
		}

		if (criteria.hasOrder()) {
			query.sort = {
				[criteria.order.orderBy.value]: criteria.order.orderType.value === OrderTypes.ASC ? 1 : -1,
			};
		}

		if (criteria.pageSize !== null) {
			query.limit = criteria.pageSize;
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query.skip = criteria.pageSize * (criteria.pageNumber - 1);
		}

		return query;
	}

	private generateMongoFilter(filter: Filter): MongoFilter {
		const field = filter.field.value;
		const value = filter.value.value;

		if (filter.operator.isContains()) {
			return {
				[field]: { $regex: value },
			};
		}

		if (filter.operator.isNotContains()) {
			return {
				[field]: { $not: { $regex: value } },
			};
		}

		if (filter.operator.isGreaterThan()) {
			return {
				[field]: { $gt: value },
			};
		}

		if (filter.operator.isGreaterThanOrEqual()) {
			return {
				[field]: { $gte: value },
			};
		}

		if (filter.operator.isLowerThan()) {
			return {
				[field]: { $lt: value },
			};
		}

		if (filter.operator.isLowerThanOrEqual()) {
			return {
				[field]: { $lte: value },
			};
		}

		if (filter.operator.isNotEquals()) {
			return {
				[field]: { $ne: value },
			};
		}

		return {
			[field]: { $eq: value },
		};
	}
}
