const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Mock data

const books = [
  { id: '2', name: 'book2', genre: 'Horror' },
  { id: '5', name: 'book5', genre: 'Fantasy' },
  { id: '3', name: 'book3', genre: 'Horror' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        const b = books.filter((e) => e.id == args.id);
        return b[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
