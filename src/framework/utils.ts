import { Chemical, dummyChemical } from './chemical.js';

export type FilterType = 'AND' | 'OR';

export const isNumber = (input: string) => {
  return /^[+-]?\d+(\.\d+)?$/.test(input);
};

export const createSqlQuery = (attributes: Partial<Chemical>, logicOperator: FilterType, quantity: number | undefined) => {
  // Start building the query
  let query = logicOperator == 'AND' ? ' WHERE 1 = 1' : 'WHERE 0 = 1';
  // Loop through the attributes and dynamically build the WHERE clause
  for (const key in dummyChemical) {
    if (attributes[key as keyof Chemical] !== undefined) {
      const value = attributes[key as keyof Chemical];
      query += ` ${logicOperator} ${key} = '${value}'`;
    }
  }
  return query + (quantity !== undefined ? ` LIMIT ${quantity}` : '');
};

export const isNumberInRange = (
  unparsedNumber: string,
  minVal: number,
  maxVal: number,
  minInclusive: boolean = true,
  maxInclusive: boolean = true,
) => {
  if (!isNumber(unparsedNumber)) {
    return false;
  }
  const num = parseFloat(unparsedNumber);
  const minCheck = minInclusive ? num >= minVal : num > minVal;
  const maxCheck = maxInclusive ? num <= maxVal : num < maxVal;

  return minCheck && maxCheck;
};
