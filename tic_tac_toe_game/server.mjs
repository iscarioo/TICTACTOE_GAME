import express from 'express';
import { fileURLToPath } from "url"
import path, { dirname } from "path"
import bodyParser from 'body-parser';
import cors from 'cors';

import { WebSocketServer } from 'ws';
import http from 'http';


// Get current directory
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDirectory = dirname(currentFilePath);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(bodyParser.json({"strict": false}));
app.use(cors({ origin: '*' }));

// Serve static files from the React frontend app
app.use(express.static(path.join(currentDirectory, './dist')));

function sendDataToClient(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(currentDirectory, './dist/index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});