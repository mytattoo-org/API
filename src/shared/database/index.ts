import { Client, Pool } from 'pg'

const createDatabase = () => {
  const database = new Client({
    host: 'mydatabase',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  return database
}

const pool = new Pool(createDatabase())

const query = async <T>(text: string) => pool.query<T>(text)

export { query, pool }
