let socket;

export const connectToWebSocket = () => {
	socket = new WebSocket('wss://stream.binance.com:9443/ws');

	socket.onopen = () => {
		console.log('Connected to WebSocket feed');
	};

	socket.onclose = () => {
		console.log('Disconnected from WebSocket feed');
	};

	socket.onerror = (error) => {
		console.error('WebSocket error:', error);
	};
};

export const subscribeToChannel = (channel, speed, productId, callback) => {
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		console.error('Socket not connected or not ready.');
		return;
	}

	const subscribeMessage = {
		method: 'SUBSCRIBE',
		params: [`${productId[0]}${channel}${speed}`],
		id: 1,
	};

	socket.send(JSON.stringify(subscribeMessage));

	socket.onmessage = (event) => {
		const message = JSON.parse(event.data);
		callback(message);
	};
};

export const disconnectWebSocket = () => {
	if (socket) {
		socket.close();
	}
};
