const grqphql = require('grqphql');
const {
  GrqphQLObjectType,
  GrqphQLString,
  GrqphQLInt  
} = grqphql;

const UserType = new GrqphQLObjectType({
  name: 'User', //describes type we're defining
  fields: {
    id: {type: GrqphQLString},
    firstName: {type: GrqphQLString},
    age: {type: GrqphQLInt}
  }
})