const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// Mock data

const books = [
  { id: '2', authorId: '1', name: 'book2', genre: 'Horror' },
  { id: '5', authorId: '2', name: 'book5', genre: 'Fantasy' },
  { id: '3', authorId: '3', name: 'book3', genre: 'Horror' },
  { id: '7', authorId: '3', name: 'book7', genre: 'Fantasy' },
];

const authors = [
  { id: '1', name: 'ali', age: 65 },
  { id: '2', name: 'veli', age: 45 },
  { id: '3', name: 'deli', age: 20 },
];

// Object Types
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        const author = authors.filter((item) => item.id == parent.authorId);
        return author;
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        let bookObj = books.filter((item) => item.authorId == parent.id);
        console.log(bookObj);
        return bookObj;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const book = books.filter((e) => e.id == args.id);
        return book[0];
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(paren, args) {
        const author = authors.filter((e) => e.id == args.id);
        return author[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
