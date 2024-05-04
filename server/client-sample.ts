import WebSocket from 'ws';

const gameId = 'game123';
const address = '0xfakewallet';
const ws = new WebSocket(`ws://localhost:8080/?gameId=${gameId}&address=${address}`);

ws.on('open', () => {
  console.log('Connected to server');

  ws.send('Hello, server!');
});

ws.on('message', (message: string) => {
  console.log(`Received message from server: ${message}`);
});

/*
if (turn submitted) {
    ws.send(deployLocations, locationAmounts, attackFroms, attackTos, gameState)
}
*/

ws.on('close', () => {
  console.log('Disconnected from server');
});