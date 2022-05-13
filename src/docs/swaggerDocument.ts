import fs from 'fs'
import jsYaml from 'js-yaml'

const spec = fs.readFileSync('./src/docs/swagger.yml', 'utf8')

const swaggerDocument = jsYaml.load(spec)

export { swaggerDocument }
