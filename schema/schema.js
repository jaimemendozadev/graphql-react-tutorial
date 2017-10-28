const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema  
} = graphql;

const usersURL = `http://localhost:3000/users`;

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
        console.log(`${usersURL}/${args.id}`)
        return axios.get(`${usersURL}/${args.id}`).then( response => {
          return response.data;
        });        
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});