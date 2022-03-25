# http-request-debugger

Small http Server that logs a single request and exit.

Output can be controlled by using querystring parameters:
 - encoding: same available to [Buffer.toString()](https://nodejs.org/api/buffer.html#buffers-and-character-encodings), use "none" to suppress
 - headers: use "none" to suppress

## how to run this service
```sh
# listen on the default port (3000), for a single HTTP request
$ node http-request-debugger.js

# listen on port 4000, for a single HTTP request
$ PORT=4000 node http-request-debugger.js
```

## how call this service
```sh
# call the server from another terminal
$ curl --data 'msg=hello world' 'http://localhost:3000'

  # call the server using multipart/form-data, with a value and the contents of a file
$  curl --form 'msg=hello world' --form myFile=@my-file.jpg 'http://localhost:3000/any-path'
```
