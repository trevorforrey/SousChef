async function listEntityTypes(projectId) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient();

  // The path to the agent the entity types belong to.
  const agentPath = entityTypesClient.projectAgentPath(projectId);

  const request = {
    parent: agentPath,
  };

  // Call the client library to retrieve a list of all existing entity types.
  return entityTypesClient
    .listEntityTypes(request)
    .then(responses => {
      responses[0].forEach(entityType => {
        console.log(`Entity type name: ${entityType.name}`);
        console.log(`Entity type display name: ${entityType.displayName}`);
        console.log(`Number of entities: ${entityType.entities.length}\n`);
      });
      return responses[0];
    })
    .catch(err => {
      console.error('Failed to list entity types:', err);
    });
}

export default listEntityTypes;
