import app from './app';
import config from './config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.db as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
