import { createServer } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const port = process.env.PORT || 3000

async function startServer() {
  const server = await createServer({
    configFile: resolve(__dirname, 'vite.config.ts'),
    root: __dirname,
    server: {
      port: parseInt(port),
      host: '0.0.0.0',
    },
  })

  await server.listen()
  console.log(`Server running at http://0.0.0.0:${port}`)
}

startServer()
