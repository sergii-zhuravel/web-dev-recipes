Example of creating a HTTPS server with express.js

1. Generate certificate and key using openssl for example

`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365`

2. Use https instead of http to create express server (see server.js example)
