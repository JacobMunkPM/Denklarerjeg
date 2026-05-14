const { MongoClient } = require('mongodb');

let client;

module.exports = async function (context, req) {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
    }
    const state = req.body;
    const db = client.db('DenKlarerJeg');
    const collection = db.collection('state');
    await collection.replaceOne(
      { _id: 'shared' },
      { _id: 'shared', state },
      { upsert: true }
    );
    context.res = { status: 200, body: 'OK' };
  } catch (e) {
    context.res = { status: 500, body: 'Fejl: ' + e.message };
  }
};
