var MongoClient = require('mongodb').MongoClient;

//=========== User Login =================//
async function getLoginUser(req, res) {
    
    let usernameForm = req.usernameLogin;
    let passwordForm = req.passwordLogin;
    let client;
    let mongo_pw = process.env.MONGO_PW;
    let uri = "mongodb+srv://tforrey:" + mongo_pw + "@cluster0-mypdv.mongodb.net/test?retryWrites=true";
    
    
    try {
        client = await MongoClient.connect(uri);
        console.log("Connected correctly to server");
        
        const db = client.db('sous-chef');
        
        // Get the users collection
        const users = db.collection('users');
        
        
        
        // Get user from document
        let userDB = await users.findOne(
            {
                username: { $eq: usernameForm },
                pass: {$eq: passwordForm}
            }
        );
        
        if(usernameForm === userDB.username && passwordForm === userDB.pass) {
            console.log("==========================================\n", req.body);
            res.redirect('/home.html');
        }
        
        
    } catch (err) {
        res.status(500);
        res.send('failure');
        console.log(err.stack);
        client.close();
    }
    client.close();
    res.status(200);
    res.json(recipes_response);
    
}
// allows us to import the function in app.js
export default getLoginUser;