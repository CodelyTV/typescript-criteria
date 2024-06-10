import { Criteria, Filter } from "@codelytv/criteria";

type ElasticsearchSort = Record<string, { order: "asc" | "desc" } | { [key: string]: any }>;

interface ElasticsearchMatchFilter {
	match: Record<string, string>;
}
interface ElasticsearchContainsFilter {
	match_phrase_prefix: Record<string, string>;
}

interface ElasticsearchMustNotFilter {
	bool: {
		must_not: ElasticsearchMatchFilter;
	};
}

interface ElasticsearchTermFilter {
	term: Record<string, string>;
}

type ElasticsearchFilter =
	| ElasticsearchMatchFilter
	| ElasticsearchMustNotFilter
	| ElasticsearchContainsFilter
	| ElasticsearchTermFilter;

export type ElasticsearchQuery = {
	index: string;
	body: {
		query: {
			bool: {
				must?: ElasticsearchFilter[];
				must_not?: ElasticsearchFilter[];
			};
		};
		sort?: ElasticsearchSort[];
		size?: number;
		from?: number;
	};
};

export class CriteriaToElasticsearchConverter {
	convert(indexName: string, criteria: Criteria): ElasticsearchQuery {
		const query: ElasticsearchQuery = {
			index: indexName,
			body: {
				query: {
					bool: {},
				},
			},
		};

		if (criteria.hasFilters()) {
			query.body.query.bool.must = criteria.filters.value.map((filter) =>
				this.generateElasticsearchQuery(filter),
			);
		}

		if (criteria.hasOrder()) {
			query.body.sort = [
				{
					[criteria.order.orderBy.value]: {
						order: criteria.order.orderType.value.valueOf().toLowerCase(),
					},
				},
			];
		}

		if (criteria.pageSize !== null) {
			query.body.size = criteria.pageSize;
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query.body.from = criteria.pageSize * (criteria.pageNumber - 1);
		}

		return query;
	}

	private generateElasticsearchQuery(filter: Filter): ElasticsearchFilter {
		if (filter.operator.isContains()) {
			return {
				match_phrase_prefix: {
					[filter.field.value]: filter.value.value,
				},
			};
		}

		if (filter.operator.isNotContains()) {
			return {
				bool: {
					must_not: {
						match: {
							[filter.field.value]: filter.value.value,
						},
					},
				},
			};
		}

		return {
			match: {
				[filter.field.value]: filter.value.value,
			},
		};
	}
}
