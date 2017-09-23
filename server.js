const app = require('express')();
const expressGraphQL = require('express-graphql'); //by convention, has to be typed GraphQL

app.use('/graphql', expressGraphQL({
  graphiql: true, //only for dev environment
  

}));

app.listen(3000, ()=> {
  console.log("Listening on port 3000");
})