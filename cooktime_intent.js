let MongoClient = require('mongodb').MongoClient;

async function getCookTime() {
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    let cook_time = null;
    
    try {
        client =await MongoClient.connect(uri);
        console.log("Connected correctly to the server");
        
        const db = client.db('sous-chef');
        
        // Get the recipes collection
        const collection = db.collection('recipes');
        
        // Find recipe document for Blueberry Pancakes
        const cursor = await collection.find({name : "Todd's Favorite Blueberry Pancakes"}).limit(1);
        
        // Get recipe document from cursor
        const recipe_doc = await cursor.next();
        
        // Get the cook time field from the recipe
        let cook_time = recipe_doc.cook_time;
        
    } catch (err) {
        console.log(err.stack);
        client.close();
    }
    
    // Close the connection before returning cook time
    client.close();
    console.log('cook time connection has closed');
   
    return cook_time;
}

// allows us to import the function in app.js
export default getCookTime();


    

