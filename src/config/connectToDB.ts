import { Client } from 'pg'

const connectToTestsDB = async () => {
  const database = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_TEST_CONTAINER,
    port: Number(process.env.DB_TEST_PORT)
  })

  await database.connect()

  return database
}

const connectToProdDB = async () => {
  const database = new Client({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_CONTAINER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  await database.connect()

  return database
}

const connectToDB =
  process.env.IS_TESTING === 'true' ? connectToTestsDB : connectToProdDB

export { connectToDB, connectToTestsDB }
