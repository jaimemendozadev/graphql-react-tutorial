const app = require('express')();
const expressGraphQL = require('express-graphql'); //by convention, has to be typed GraphQL
const schema = require('./schema/schema.js');

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true, //only for dev environment
  

}));

app.listen(4000, ()=> {
  console.log("Listening on port 4000");
})