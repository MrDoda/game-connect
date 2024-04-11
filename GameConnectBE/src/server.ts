import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})