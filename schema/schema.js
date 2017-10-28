const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema  
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User', //describes type we're defining
  fields: {
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type:UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
              
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});