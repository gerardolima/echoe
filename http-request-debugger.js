// https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
// https://nodejs.dev/learn/the-nodejs-http-module
// https://nodejs.org/docs/latest-v14.x/api/http.html#http_event_request

const http = require('http')

const port = process.env['PORT'] ?? 3000

/**
 * @param {Buffer|string} v
 * @param {TranscodeEncoding} e
 */
const log = (v, e='binary') => Buffer.isBuffer(v)
  ? console.log(v.toString(e))
  : console.log(v)

/** @type http.RequestListener */
const requestListener = function (req, res) {
  const {headers} = req
  res.statusCode = 204

  log(`${req.method}: ${req.url}`)
  log(headers)

  req.on('data', buf => log(buf, 'binary'))
  res.end()
}

const server = http.createServer(requestListener)
server.listen(port, () => {
  console.log(`http-request-debugger listening on port ${port}`)
})
