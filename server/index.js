import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import S3Cache from './storage';
import fetchOA from './fetch-oa';
let httpServer;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));
}
app.get('/api', async (req, res) => {
  const { oaq } = req.query;
  console.log(oaq);
  if (!oaq) return res.json({});
  const key = Buffer.from(oaq).toString('base64');
  const hasCache = await S3Cache.exists(`${key}.json`).then(() => true).catch(() => false);
  console.log('hasCache', hasCache);
  if (hasCache) {
    const url = await S3Cache.get(`${key}.json`)
    return res.redirect(url)
  }
  
  const data = await fetchOA(JSON.parse(oaq))
    .catch(() => {
      console.log('error');
      return null;
    });
  if (data) {
    S3Cache.set(`${key}.json`, Buffer.from(JSON.stringify(data)));
    return res.json({ results: data, filters: JSON.parse(oaq) });
  }
  return res.status(400).json({})
});

// SERVE REACT BUILD
app.use(express.static(path.join(path.resolve(), '/ui/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '/ui/dist/index.html'));
});

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

