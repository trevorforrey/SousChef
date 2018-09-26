let MongoClient = require('mongodb').MongoClient;
async function getFirstStep(){
	let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    let first_step=null;
    try {
    	client = await MongoClient.connect(uri);
      console.log("Connected correctly to server");
      const db = client.db('sous-chef');
  
      // Get the recipes collection
      const collection = db.collection('recipes');
  
      // Find recipe document for Blueberry Pancakes
      const cursor = await collection.find({name : "Todd's Favorite Blueberry Pancakes"}).limit(1);

      // Get recipe document from cursor
      const receipe_doc = await cursor.next();
      let first_step=receipe_doc.directions[0];     
      // Close connection before returning
    client.close();
    console.log('connection closed');
    return first_step;
    }catch (err) {
      console.log(err.stack);
      client.close();
    }
    
}
export default getFirstStep;