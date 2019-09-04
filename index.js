const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

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

const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(product => slugify(product.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	switch (pathname) {
		case '/':
		case '/overview':
			const cardsHtml = dataObj.map(card => replaceTemplate(cardTemplate, card)).join('');
			const overviewHtml = overviewTemplate.replace('%productCards%', cardsHtml);
			res.writeHead(200, {ContentType: 'text/html'});
			res.end(overviewHtml);
			break;

		case '/product':
			const product = dataObj[query.id];
			const productHtml = replaceTemplate(productTemplate, product);
			res.writeHead(200, {ContentType: 'text/html'});
			res.end(productHtml);
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
