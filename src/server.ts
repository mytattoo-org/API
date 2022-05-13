import 'dotenv/config'
import 'express-async-errors'
import 'reflect-metadata'

import '@shared/containers'
import { app } from '@shared/routes'

const port = process.env.PORT

app.listen(port, () => console.log(`Running at ${port}`))
