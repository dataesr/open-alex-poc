import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';

let httpServer;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));
}
app.use(express.static(path.join(path.resolve(), 'dist')));

async function cleanup() {
  app.isReady = false;
  if (httpServer) {
    await httpServer.close();
  }
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function createAPIServer(port) {
  httpServer = app.listen(port, () => {
    console.log(`Server started. Port is 3000`);
    app.isReady = true;
  });
}

createAPIServer(3000);
