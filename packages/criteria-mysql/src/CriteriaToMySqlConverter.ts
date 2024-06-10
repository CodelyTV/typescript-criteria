import { Criteria, Filter } from "@codelytv/criteria";

type Mappings = { [key: string]: string };

export class CriteriaToMySqlConverter {
	convert(
		fieldsToSelect: string[],
		tableName: string,
		criteria: Criteria,
		mappings: Mappings = {},
	): { query: string; params: (string | number)[] } {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;
		const params: (string | number)[] = [];

		if (criteria.hasFilters()) {
			query += " WHERE ";

			const whereQueries = criteria.filters.value.map((filter) =>
				this.generateWhereQuery(filter, mappings, params),
			);

			query += whereQueries.join(" AND ");
		}

		if (criteria.hasOrder()) {
			query += " ORDER BY ? ?";

			params.push(criteria.order.orderBy.value, criteria.order.orderType.value);
		}

		if (criteria.pageSize !== null) {
			query += " LIMIT ?";

			params.push(criteria.pageSize);
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query += " OFFSET ?";

			params.push(criteria.pageSize * (criteria.pageNumber - 1));
		}

		return { query: `${query};`, params };
	}

	private generateWhereQuery(
		filter: Filter,
		mappings: Mappings = {},
		params: (string | number)[],
	): string {
		const field = mappings[filter.field.value] || filter.field.value;

		let queryPart = `${field} `;
		const value = filter.value.value;

		if (filter.operator.isContains()) {
			queryPart += "LIKE ?";
			params.push(`%${value}%`);
		} else if (filter.operator.isNotContains()) {
			queryPart += "NOT LIKE ?";
			params.push(`%${value}%`);
		} else if (filter.operator.isNotEquals()) {
			queryPart += "!= ?";
			params.push(value);
		} else if (filter.operator.isGreaterThan()) {
			queryPart += "> ?";
			params.push(value);
		} else if (filter.operator.isGreaterThanOrEqual()) {
			queryPart += ">= ?";
			params.push(value);
		} else if (filter.operator.isLowerThan()) {
			queryPart += "< ?";
			params.push(value);
		} else if (filter.operator.isLowerThanOrEqual()) {
			queryPart += "<= ?";
			params.push(value);
		} else {
			queryPart += `${filter.operator.value} ?`;
			params.push(value);
		}

		return queryPart;
	}
}
