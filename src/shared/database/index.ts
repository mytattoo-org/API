import { Client, Pool } from 'pg'

const createTestsDB = () => {
  const database = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_TEST_CONTAINER,
    port: Number(process.env.DB_TEST_PORT)
  })

  return database
}

const createProductionDB = () => {
  const database = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_CONTAINER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  return database
}

const createDatabase = () => {
  let database: Client

  if (process.env.IS_TESTING === 'true') database = createTestsDB()
  else database = createProductionDB()

  return database
}

const pool = new Pool(createDatabase())

const query = async <T>(text) => {
  return pool.query<T>(text)
}

export { query, pool }
