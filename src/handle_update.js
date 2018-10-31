let MongoClient = require('mongodb').MongoClient;
async function update_recipe_in_db(req, res){
	//let recipe_name=req.body;
	//let req_obj=JSON.parse(req)
	let recipe={
		"name":"chicken soup",
		"prep_time" :"test",
		"ingredients" :["nothing"],
		"directions" :["idk"],	
	};
	let name="red sauce";
	let recipeId=0;
	let queryId=recipeId.toString();
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
    
        let user_doc = await users.findOne(
            {
            	username: { $eq: user }
            }, 
             // Append recipe to user's recipes array
        );
        var setField="recipes."+queryId;
        try{


				users.updateOne(
					{"username" : "raisa"},
						{
							$set:{ setField : recipe}
						}
				);
				//console.log("no error");
			
			} catch(e){
				console.log("error: "+ e);	
			}

    
    } catch (err) {
        console.log(err.stack);
        res.status(500);
        res.send("failure");
        client.close();
    }
    client.close();
    res.status(201);
    res.send("success")
};

export default update_recipe_in_db;