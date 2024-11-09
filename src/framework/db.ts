import mysql, { Connection } from 'mysql2';

export const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'bennoama',
  password: 'bgr5znTj!',
});

export const connectToDb = async () => {
  connection.connect((err) => {
    if (err) {
      throw err;
    }
  });
  connection.query('CREATE DATABASE IF NOT EXISTS chemicals;', (err) => {
    if (err) {
      throw err;
    }
  });
  connection.changeUser({ database: 'chemicals' }, (err) => {
    if (err) {
      throw err;
    }
  });

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS chemicals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    formula VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    units VARCHAR(50) NOT NULL,
    expirationDate VARCHAR(50) NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    cleanlinessLevel INT NOT NULL,
    location VARCHAR(255) NOT NULL
  );
`;
  connection.execute(createTableQuery, (err) => {
    if (err) {
      throw err;
    }
  });
  console.log('Connected to db');
};
