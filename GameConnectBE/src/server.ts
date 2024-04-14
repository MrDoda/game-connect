import dotenv from 'dotenv'
import { app } from './app'
import { Database } from './config/database'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

Database.testConnection()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
