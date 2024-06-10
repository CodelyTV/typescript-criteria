import { Criteria, Filter } from "@codely-criteria/criteria";

type Mappings = { [key: string]: string };

export class CriteriaToMySqlConverter {
	convert(
		fieldsToSelect: string[],
		tableName: string,
		criteria: Criteria,
		mappings: Mappings = {},
	): string {
		let query = `SELECT ${fieldsToSelect.join(", ")} FROM ${tableName}`;

		if (criteria.hasFilters()) {
			query = query.concat(" WHERE ");

			const whereQuery = criteria.filters.value.map((filter) =>
				this.generateWhereQuery(filter, mappings),
			);

			query = query.concat(whereQuery.join(" AND "));
		}

		if (criteria.hasOrder()) {
			query = query.concat(
				` ORDER BY ${criteria.order.orderBy.value} ${criteria.order.orderType.value.valueOf()}`,
			);
		}

		if (criteria.pageSize !== null) {
			query = query.concat(` LIMIT ${criteria.pageSize}`);
		}

		if (criteria.pageSize !== null && criteria.pageNumber !== null) {
			query = query.concat(` OFFSET ${criteria.pageSize * (criteria.pageNumber - 1)}`);
		}

		return `${query};`;
	}

	private generateWhereQuery(filter: Filter, mappings: Mappings = {}) {
		const field = mappings[filter.field.value] || filter.field.value;

		if (filter.operator.isContains()) {
			return `${field} LIKE '%${filter.value.value}%'`;
		}

		if (filter.operator.isNotContains()) {
			return `${field} NOT LIKE '%${filter.value.value}%'`;
		}

		if (filter.operator.isNotEquals()) {
			return `${field} != '${filter.value.value}'`;
		}

		return `${field} ${filter.operator.value} '${filter.value.value}'`;
	}
}
