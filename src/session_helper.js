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
            if (contexts[i].name == "session_data") {
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
export function set_session_data(contexts, sessionData) {
    // Find session data from request context, and set it
    if (contexts != null) {
        for (let i = 0; i < contexts.length; i++) {
            if (contexts[i].name == "session_data") {
                contexts[i].parameters = sessionData;
            }
        }
    }
    return contexts;
}