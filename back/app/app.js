//hello world
const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

//8000번 포트로 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

