const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema  
} = graphql;

const usersURL = `http://localhost:3000/users`;
const companiesURL = `http://localhost:3000/companies`;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  //wrap fields obj with arrow function to avoid closure issue
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return axios.get(`${companiesURL}/${parentValue.id}/users`).then( response => {
          return response.data;
        });
      }
    } 
  })
});


const UserType = new GraphQLObjectType({
  name: 'User', //describes type we're defining
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType, //treat associations bet. types as a field
      resolve(parentValue, args){
        return axios.get(`${companiesURL}/${parentValue.companyId}`).then( response => {
          return response.data;
        });
      }
    }  
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`${usersURL}/${args.id}`).then( response => {
          return response.data;
        });        
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args){
        return axios.get(`${companiesURL}/${args.id}`).then(response => {
          return response.data;
        });
      }
    }
  }
});

/*
- mutation fields describe the operation the mutation will undertake

- type field refers to type of data you'll return from resolve function.

- sometimes when you have a mutation, the collection of data you're operating on and the type that you return might not always be the same
*/

// const usersURL = `http://localhost:3000/users`;
// const companiesURL = `http://localhost:3000/companies`;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        companyId: {type: GraphQLString}
      },
      resolve(parentValue, {firstName, age}){
        return axios.post(`${usersURL}`, {firstName, age}).then(response => {
          return response.data;
        });
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});