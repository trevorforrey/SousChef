let MongoClient = require('mongodb').MongoClient;
async function update_recipe_in_db(req, res){
    /* Hardcoded recipe
	let recipe=
   {
		"name":"Biriyanihhh",
		"prep_time" :"30 minutes",
		"ingredients" :[{"name":"rice","quantity":"250","unit":"gram"},{"name":"chicken","quantity":"250","unit":"gram"}],
		"directions" :["Soak rice","Cook chicken"]	
	}; 
    */
    console.log(req.session.username)
	let old_name=req.body.old_name.name;
    let new_name=req.body.recipe.name;
    let prep_time=req.body.recipe.prep_time;
    let cook_time=req.body.recipe.cook_time;
    let ingredients=req.body.recipe.ingredients;
    let directions=req.body.recipe.directions;
    let serving_size=req.body.recipe.serving_size;
	let user = req.session.username;
  	let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
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
             
        );
       
        try{
               //update recipe matching old recipe name

				users.updateOne(
					{username : user,'recipes.name':old_name},
						{
							$set:{ "recipes.$.name" : new_name,"recipes.$.prep_time":prep_time,
                                    "recipes.$.cook_time":cook_time,"recipes.$.serving_size":serving_size,
                                    "recipes.$.ingredients":ingredients,"recipes.$.directions":directions}
						}
				);
				
			
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