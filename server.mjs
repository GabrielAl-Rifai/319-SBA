import express from `express`;
import dotenv from `dotenv`

dotenv.config()
const app = experss()
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log(`Server is listening on port: ${PORT}`)
})