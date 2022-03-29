// https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
// https://nodejs.dev/learn/the-nodejs-http-module
// https://nodejs.org/docs/latest-v14.x/api/http.html#http_event_request

const http = require('http')
const { URL } = require('url')

const port = process.env['PORT'] ?? 3000

/**
 * @param {Buffer|string} v
 * @param {TranscodeEncoding} e
 */
const log = (v, e='binary') => Buffer.isBuffer(v)
  ? console.log(v.toString(e))
  : console.log(v)

/** @param {string} url */
const parseParams = (url) => {
  const {searchParams} = new URL(`http://host${url}`)
  const falsy = ['n', 'no', '0', 'false']

  const showUrl     = !falsy.includes(searchParams.get('u'))
  const showHeaders = !falsy.includes(searchParams.get('h'))
  const showBody    = !falsy.includes(searchParams.get('b'))

  let encoding = searchParams.get('e')
  if(!Buffer.isEncoding(encoding)) encoding = 'binary'

  return {showUrl, showHeaders, showBody, encoding}
}

/** @type http.RequestListener */
const requestListener = (req, res) => {
  const {headers, method, url} = req
  const {showUrl, showHeaders, showBody, encoding} = parseParams(url)

  if(showUrl) log(`[${(new Date).toISOString()}] ${method}: ${url}`)
  if(showHeaders) log(headers)
  if(showBody) req.on('data', buf => log(buf, encoding))

  res.statusCode = 204
  res.end()
}

const server = http.createServer(requestListener)
server.listen(port, () => {
  console.log(`http-request-debugger listening on port ${port}`)
})
