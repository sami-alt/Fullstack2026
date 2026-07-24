require('dotenv').config()

const PORT = process.env.PORT
const MONGO_DB_URI = process.env.NODE_ENV === 'production'
? process.env.MONGO_DB_URI
: process.NODE_ENV === 'test'
? process.env.MONGO_TEST_DB_URI 
: process.env.MONGO_TEST_DB_LOCAL

module.exports = { MONGO_DB_URI, PORT }