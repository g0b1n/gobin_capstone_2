require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'development-secret-key';
const PORT = +process.env.PORT || 5000;
const BCRYPT_WORK_FACTOR = 10;

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '44909fd672msh6b8734ecb132ae7p1bfc71jsnfdd51c4b8064';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'api-football-v1.p.rapidapi.com';
// API base url
const RAPIDAPI_BASE_URL = `https://${RAPIDAPI_HOST}/v3`;
const DB_URI = process.env.NODE_ENV === 'test' ? 'postgresql:///futBall_test' : process.env.DATABASE_URL || 'postgresql:///futBall';

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI,
  RAPIDAPI_KEY,
  RAPIDAPI_HOST,
  RAPIDAPI_BASE_URL
};
