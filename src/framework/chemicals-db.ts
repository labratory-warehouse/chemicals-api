import { Chemical } from './chemical.js';
import { connection } from './db.js';
import { createSqlQuery, FilterType } from './utils.js';

export const getChemicals = async (attributes: Partial<Chemical>, logicOperator: FilterType) => {
  const sqlQuery = 'SELECT * FROM chemicals ' + createSqlQuery(attributes, logicOperator, undefined);
  return getQueryResponse(sqlQuery, undefined);
};

const getQueryResponse = async (sqlQuery: string, values: (string | number)[] | undefined) => {
  const chemicals: Chemical[] = [];
  return new Promise<Chemical[] | number>((resolve, reject) => {
    connection.query(sqlQuery, values, (err, results) => {
      if (err) {
        console.log(err);
        reject();
      }
      if (Array.isArray(results)) {
        results.forEach((chemical) => {
          console.log(chemical);
          chemicals.push(chemical as Chemical);
        });
        resolve(chemicals);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
};

export const insertChemical = async (attributes: Chemical, quantity: number) => {
  // Generate the base query with placeholders for each row
  const placeholders = Array(quantity).fill('(?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
  const sqlQuery = `
    INSERT INTO chemicals (name, formula, amount, units, expirationDate, supplier, cleanlinessLevel, location)
    VALUES ${placeholders}
  `;
  // Create a values array that repeats the attributes for each row
  const values = createValuesArray(attributes, quantity);
  const res = await getQueryResponse(sqlQuery, values);
  return new Array<Chemical>(res as number).fill(attributes);
};

export const deleteChemical = async (attributes: Chemical, quantity: number) => {
  const sqlQuery = 'DELETE FROM chemicals ' + createSqlQuery(attributes, 'AND', quantity);
  const res = await getQueryResponse(sqlQuery, undefined);
  return new Array<Chemical>(res as number).fill(attributes);
};

const createValuesArray = (attributes: Chemical, quantity: number) => {
  const values = [];
  for (let i = 0; i < quantity; i++) {
    values.push(
      attributes.name,
      attributes.formula,
      attributes.amount,
      attributes.units,
      new Date(attributes.expirationDate).toISOString(),
      attributes.supplier,
      attributes.cleanlinessLevel,
      attributes.location,
    );
  }

  return values;
};
