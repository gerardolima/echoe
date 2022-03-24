const express = require('express')
const bodyParser = require('body-parser')

const port = process.env['PORT'] ?? 3000

const app = express()
app.use(bodyParser.raw({
  inflate: true,
  limit: '100kb',
  type: '*/*',
}));

app.all('/', (req, res) => {
  const {headers} = req

  res.header('server', 'http-request-debugger')
  res.contentType('text/text')
  res.status(204)
  res.send()

  console.debug(headers)
  console.debug(req.body.toString('binary'))
  process.exit(0)
})

app.listen(port, () => {
  console.log(`http-request-debugger listening on port ${port}`)
})
