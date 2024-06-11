import { Criteria, Filter } from "@codelytv/criteria";

export class CriteriaToEsqlConverter {
	convert(indexName: string, criteria: Criteria): string {
		let query = `FROM ${indexName}`;

		if (criteria.hasFilters()) {
			query = query.concat(" | WHERE ");

			const whereQuery = criteria.filters.value.map((filter) => this.generateWhereQuery(filter));

			query = query.concat(whereQuery.join(" AND "));
		}

		if (criteria.hasOrder()) {
			query = query.concat(
				` | SORT ${criteria.order.orderBy.value} ${criteria.order.orderType.value.valueOf()}`,
			);
		}

		if (criteria.pageSize !== null) {
			query = query.concat(` | LIMIT ${criteria.pageSize}`);
		}

		return query;
	}

	private generateWhereQuery(filter: Filter) {
		if (filter.operator.isContains()) {
			return `${filter.field.value} LIKE "*${filter.value.value}*"`;
		}

		if (filter.operator.isNotContains()) {
			return `${filter.field.value} NOT LIKE "*${filter.value.value}*"`;
		}

		return `${filter.field.value} ${filter.operator.value} "${filter.value.value}"`;
	}
}
