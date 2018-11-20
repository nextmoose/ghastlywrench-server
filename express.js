const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const port = 8080;
const path = require('path');

const data = [
    {state: "Virginia", capital: "Richmond"},
    {state: "Maryland", capital: "Annapolis"}
];
app
    .get('/rest/hello', (req, res) => res.send('Hello World!'))
    .get('/rest/data', (req, res) => res.json(data))
    .use(express.static(path.join(__dirname, 'public')))
    .ws('/socket/echo', function(ws, req) {
	ws.on('message', function(msg) {
	    data.push(JSON.parse(msg));
	    ws.send(data.length);
	});
    })
    .listen(port, () => console.log(`Example app listening on port ${port}!`));
