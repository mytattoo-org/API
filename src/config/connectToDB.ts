import { Client } from 'pg'

const connectToDB = async () => {
  const database = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  await database.connect()

  return database
}

export { connectToDB }
