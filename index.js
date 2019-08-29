const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written successfully');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
// 	if (err) return console.log('ERROR!');

// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
// 		console.log(data2);
// 		fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
// 			console.log(data3);

// 			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, err => {
// 				console.log('File written successfully');
// 			});
// 		});
// 	});
// });

/////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
});
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	switch (pathName) {
		case '/':
		case '/overview':
			res.end('This is the OVERVIEW');
			break;

		case '/product':
			res.end('This is the PRODUCT');
			break;

		case '/api':
			res.writeHead(200, {
				'Content-type': 'application/json'
			});
			res.end(data);
			break;

		default:
			res.writeHead(404, {
				'Content-type': 'text/html',
				'custom-header': 'hello world',
			});
			res.end('<h1>Page not found</h1>');
			break;
	}
});

server.listen(8000, () => {
	console.log('Listening to requests on port 8000');
});
