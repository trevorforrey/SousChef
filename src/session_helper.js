// Example of how session data should look
    // data.queryResult.outputContexts = [
    //     {...},
    //     {...},
    //     {  name: "session_data",
    //        lifespan: 5,
    //        parameters: {
    //          "username": "Tony Gunk",
    //          "recipe": "Tony's Kentucky Chicken",
    //          "currentStep": 1
    //          "serving_proportion": 3.141592653
    //        }
    // ]


// get session data
// takes in an array of contexts, returns session data if it exists
// and null if it doesn't exist
export function get_session_data(contexts) {

    let sessionData;
    // Grab session data from request context (if it exists)
    if (contexts != null) {
        for (let i = 0; i < contexts.length; i++) {
            if (contexts[i].name.includes("session_data")) {
                sessionData = contexts[i].parameters;
            }
        }
    }
    return sessionData;
}

// set session data
// takes in an array of contexts, and a new session data object
// sets the current session data in the context to the new session data
// and returns the new context array
export function set_session_data(contexts, sessionData,ProjectID,SessionID) {
    // Find session data from request context, and set it
    let session_found = false
    if (contexts != null) {
        for (let i = 0; i < contexts.length; i++) {
            if (contexts[i].name === undefined){
                console.log("WARNING: NO CONTEXT NAME.");
            }
            if (contexts[i].name.includes("session_data")) {
                contexts[i].parameters = sessionData;
                session_found = true;
                contexts[i].lifespanCount = 5;
            }
        }
        if (!session_found) {
          contexts.push({
            "name" : "projects/" + ProjectID + "/agent/sessions/"+ SessionID + "/contexts/session_data",
            "lifespanCount" : 5,
            "parameters" : sessionData
          })
        }
    }
    return contexts;
}

export function get_initial_session_data(contexts) {
  let sessionData = null
  if (contexts != null) {
    for (let i = 0; i < contexts.length; i++) {
        if (contexts[i].name.includes("login-requestuser-followup")) {
            
            sessionData = {
              "username" : contexts[i].parameters.username,
              "recipe" : contexts[i].parameters.recipe,
              "serving_proportion": 1.0
            }
        }
    }
  }
  return sessionData
}

export function handle_no_session_data(req,res,sessionData) {
    let response = {};

    res.status(400);
    response.fulfillmentText = "You aren't logged in, please ask to log in to cook";
    res.json(response);
    return;
}
