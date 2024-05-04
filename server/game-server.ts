import WebSocket from 'ws';

interface Player {
    id: number;
    address: string;
    ws: WebSocket;
}

interface GameSession {
    gameId: string;
    players: Player[];
}

const games: Record<string, GameSession> = {};
const addressMap: Record<string, Player> = {};

const wss = new WebSocket.Server({ port: 8080 });
console.log("Server running on port 8080");

wss.on('connection', (ws: WebSocket, req) => {
    const gameId = new URLSearchParams(req.url?.substring(1)).get('gameId');
    if (!gameId) {
        ws.close(4000, 'Game ID must be provided');
        return;
    }

    console.log(`Connection request for game ID: ${gameId}`);

    if (!games[gameId]) {
        games[gameId] = { gameId, players: [] };
    }

    const game = games[gameId];

    if (game.players.length >= 3) {
        ws.close(4001, 'Game is full');
        return;
    }

    const playerAddress = new URLSearchParams(req.url?.substring(2)).get('address');
    console.log(playerAddress);
    if (playerAddress == null) {
        ws.close(4000, 'Address must be valid');
        return;
    }

    // validate against onchain player list
    // validate signatures

    var playerId = 0;
    if (!addressMap[playerAddress]) {
        playerId = game.players.length;
        addressMap[playerAddress] = { id: playerId, address: playerAddress, ws };
        game.players.push(addressMap[playerAddress]);

        console.log(`New player ${playerAddress} connected with ID ${playerId} to game ID ${gameId}`);
    } else {
        playerId = addressMap[playerAddress].id;

        console.log(`Player ${playerAddress} reconnected with ID ${playerId} to game ID ${gameId}`);
    }
    
    ws.on('message', (message: string) => {
        console.log(`Received message from player ${playerId} in game ${gameId}: ${message}`);
        // Broadcast message to other players in the same game
        game.players.forEach(player => {
            if (player.id !== playerId) {  // Avoid sending the message back to the sender
                player.ws.send(`Player ${playerId} says: ${message}`);
            }
        });
    });
    // recieve move submission, validate signature


    ws.on('close', () => {
        console.log(`Player ${playerId} disconnected from game ${gameId}`);
        // Remove player from the game
        games[gameId].players = game.players.filter(p => p.id !== playerId);
        if (games[gameId].players.length === 0) {
            delete games[gameId];
            console.log(`Game ${gameId} is empty and has been removed.`);
        }
    });
});
