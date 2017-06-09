const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
	console.log(__dirname);
	res.sendFile(__dirname + '/index.html');
});

//all users access the same variable
var grid = {};

io.on('connection', (socket) => {
	Object.keys(grid).forEach((key,v) => {
		io.emit('fill grid', key, grid[key]);
	});

	//each user access self object
	socket.on('select grid', (index, color) => {
		if(grid[index] === undefined){
			grid[index] = color;
			io.emit('fill grid', index, color);		
		}
	});

	socket.on('disconnect', () => {
		
	});
});

http.listen(3003, () => {

});