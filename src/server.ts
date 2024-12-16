import { Server } from 'http';
import app from './app';
import config from './config';
import mongoose from 'mongoose';

let server : Server;
async function main() {
  try {
    await mongoose.connect(config.db as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

process.on('unhandledRejection', ()=>{
  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }
  process.exit(1);
})

process.on('uncaughtException', ()=>{
  process.exit(1);
})