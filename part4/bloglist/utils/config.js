import 'dotenv/config';

const { NODE_ENV, MONGODB_DB_TEST, MONGODB_DB_PROD } = process.env;

const MONGODB_DB = NODE_ENV === 'test' ? MONGODB_DB_TEST : MONGODB_DB_PROD;

export default MONGODB_DB;
