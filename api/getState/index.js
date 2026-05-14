const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db('DenKlarerJeg');
    const collection = db.collection('state');
    const doc = await collection.findOne({ _id: 'shared' });
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: doc ? doc.state : { tasks: [] }
    };
  } catch (e) {
    context.res = { status: 500, body: 'Fejl: ' + e.message };
  } finally {
    await client.close();
  }
};
