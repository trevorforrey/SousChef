let MongoClient = require('mongodb').MongoClient;
async function update_recipe(req, res){
	//let recipe_name=req.body;
	let recipeName=req.body;
    console.log(recipeName.name)
    let recipe_name=recipeName.name;
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
        	
        	if(recipe_name===user_doc.recipes[i].name)
        	{
        		console.log("Recipe name:"+user_doc.recipes[i].name);
        		
        		response.id=i;
        				 

        	}
        	console.log(response);
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

    res.jsonp(response);
    
}
export default update_recipe;