import { connectToDb } from './framework/db.js';
import { startServer } from './server/index.js';

const main = async () => {
  try {
    await connectToDb();
    startServer();
  } catch (e) {
    console.log('ERROR in main', e);
  }
};

main();
