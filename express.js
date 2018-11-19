const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 8080;

app
    .get('/rest/hello', (req, res) => res.send('Hello World!'))
    .get('/rest/data', (req, res) => res.json([
	{state: "Virginia", capital: "Richmond"},
	{state: "Maryland", capital: "Annapolis"}
    ]))
    .ws('/echo', function(ws, req) {
	ws.on('message', function(msg) {
	    console.log("XXXXXXX");
	    console.log(msg);
	    ws.send(msg);
	});
    })
    .listen(port, () => console.log(`Example app listening on port ${port}!`));
