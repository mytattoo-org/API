import 'reflect-metadata'

import '@shared/containers'
import { app } from '@shared/routes'

import 'dotenv/config'

const port = process.env.PORT

app.listen(port, () => console.log(`Running at ${port}`))
