let MongoClient = require('mongodb').MongoClient;
async function update_recipe(req, res){
	//let recipe_name=req.body;
	let recipe_name="red sauce";
	let response={};
	let user = 'thetoastyone';
  	let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    let recipe_doc = null;
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");

        const db = client.db('sous-chef');

        // Get the users collection
        const users = db.collection('users');

        // Get user document
        let user_doc = await users.findOne(
            {
                username: { $eq: user }
            }
        );
        for (var i=0;i<user_doc.recipes.length;i++ ){
        	console.log(user_doc.recipes.name);
        	if(recipe_name===user_doc.recipes[i].name)
        	{
        		console.log(response);
        		
        		response=user_doc.recipes[i];

        	}
        }
        
    }
    catch (err) {
        res.status(500);
        res.send('failure');
        console.log(err.stack);
        client.close();
    }
    client.close();
    res.status(200);

    res.json(response);
    
  


}
export default update_recipe;