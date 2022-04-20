const express = require('express')
const fetch = require('node-fetch')
const Airtable = require('airtable')
const dayjs = require('dayjs');
const res = require('express/lib/response');
const app = express()
app.use(express.static('public'))
app.use(express.json())
require('dotenv').config();
const port = process.env.PORT || 3000

const stock_API = process.env.STOCK_API_KEY;
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appGWfv8R1VHPYYOA');
 const yesterday = dayjs().add(-1, 'day').format('YYYY-MM-DD', 'America/New_York');
// const yesterday = '2022-04-14'
		
// const sunday = dayjs().day(0);
// const monday = dayjs().day(1);
// const tuesday = dayjs().day(2);
// const wednesday = dayjs().day(3);
// const thursday = dayjs().day(4);
// const friday = dayjs().day(5);
// const saturday = dayjs().day(6);
 


const xom_url = `https://api.polygon.io/v1/open-close/XOM/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const lng_url = `https://api.polygon.io/v1/open-close/LNG/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const rio_url = `https://api.polygon.io/v1/open-close/RIO/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const ceg_url = `https://api.polygon.io/v1/open-close/CEG/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const bg_url  =  `https://api.polygon.io/v1/open-close/BG/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const shlx_url = `https://api.polygon.io/v1/open-close/SHLX/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const pypl_url = `https://api.polygon.io/v1/open-close/PYPL/${yesterday}?adjusted=true&apiKey=${stock_API}`;
const rivn_url = `https://api.polygon.io/v1/open-close/RIVN/${yesterday}?adjusted=true&apiKey=${stock_API}`;

app.get('/xom', async(req, res)=>{   	
	
		const xomData = await fetch(xom_url);
    const responseData = await xomData.json();		
		const status = responseData.status
		const high = responseData.high;
		const fromDate = responseData.from;
		const close = responseData.close;
		const symbol = responseData.symbol;
		
		if(status === 'NOT_FOUND'){
			res.json({
				status
			})
			return
		}else{
		res.json({
			high,
			fromDate,
			close,
			symbol
		});    
		}
    
    base('Stock Market').update('recAyaHaz16yYuOrq',
				{
					'Symbol': symbol,
					' Current Price per Share ': close,
					'Date of Last Price': fromDate,
				},
				function (err, record) {
					if (err) {
						console.error(err);
						return;
					}
					//console.log(record.get('Symbol'));
				},
			);

     

			 
})

//second xom stocks
app.get('/xom/second', async (req, res) => {
	const xomData = await fetch(xom_url);
	const responseData = await xomData.json();
	
	const status = responseData.status
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;


	if(status ==='NOT_FOUND'){
		res.json({ status	})
		return
	}else{
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});

	}
	
	base('Stock Market').update(
		'recyBSK9Q5BDJdQAz',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});

//LNG stocks starts here

app.get('/lng', async (req, res) => {
	const lngData = await fetch(lng_url);
	const responseData = await lngData.json();

	const status = responseData.status
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;

	if(status === "NOT_FOUND"){
		res.json({status})
		return
	}else{
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});

	}

	base('Stock Market').update(
		'recdYFUuiq056NcuG',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});

//RIO stocks starts here

app.get('/rio', async (req, res) => {
	const rioData = await fetch(rio_url);
	const responseData = await rioData.json();

	const status = responseData.status;
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;

	if (status === 'NOT_FOUND') {
		res.json({
			status,
		});
		return;
	} else {
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});
	}

	base('Stock Market').update(
		'recWhrR8NIfH4TbPl',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});


//CEG stocks starts here

app.get('/ceg', async (req, res) => {
	const cegData = await fetch(ceg_url);
	const responseData = await cegData.json();
	const status = responseData.status;	
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;

	if (status === 'NOT_FOUND') {
		res.json({
			status,
		});
		return;
	} else {
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});
	}

	base('Stock Market').update(
		'recDZh15KcINdTgs4',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});

//BG starts here

app.get('/bg', async (req, res) => {
	const bgData = await fetch(bg_url);
	const responseData = await bgData.json();

	const status = responseData.status;
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;

	if (status === 'NOT_FOUND') {
		res.json({
			status,
		});
		return;
	} else {
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});
	}

	base('Stock Market').update(
		'rechKj6XDGrtT9A3M',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});

//SHLX stocks starts here

app.get('/shlx', async (req, res) => {
	const shlxData = await fetch(shlx_url);
	const responseData = await shlxData.json();

	const status = responseData.status;
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;
  
	if (status === 'NOT_FOUND') {
		res.json({
			status,
		});
		return;
	} else {
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});
	}
	base('Stock Market').update(
		'rec4yPFzLUuJosIUa',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});

//PYPL stocks starts here

app.get('/pypl', async (req, res) => {
	const pyplData = await fetch(pypl_url);
	const responseData = await pyplData.json();

	const status = responseData.status;
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;

	if (status === 'NOT_FOUND') {
		res.json({
			status,
		});
		return;
	} else {
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});
	}
	base('Stock Market').update(
		'recBAJvMahczZeMwR',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);

	
});

//RIVN Stocks Starts here

app.get('/rivn', async (req, res) => {
	const rivnData = await fetch(rivn_url);
	const responseData = await rivnData.json();

	const status = responseData.status;		
	const high = responseData.high;
	const fromDate = responseData.from;
	const close = responseData.close;
	const symbol = responseData.symbol;

	if (status === 'NOT_FOUND') {
		res.json({
			status,
		});
		return;
	} else {
		res.json({
			high,
			fromDate,
			close,
			symbol,
		});
	}
	base('Stock Market').update(
		'rec1IVhd36ZxTGp3O',
		{
			'Symbol': symbol,
			' Current Price per Share ': close,
			'Date of Last Price': fromDate,
		},
		function (err, record) {
			if (err) {
				console.error(err);
				return;
			}
			//console.log(record.get('Symbol'));
		},
	);
});

//getting records from Airtable

app.get('/records', (req, res) =>{

const retrievedData = () => {base('Post Data').find('recrEZcXuLgqXJsrx', function (err, record) {
		if (err) {
			console.error(err);
			return;
		}
		console.log('Retrieved', record);
		
	});

}

res.json(retrievedData())



})
	


app.listen(port, ()=>console.log(`Server started on port ${port}`))