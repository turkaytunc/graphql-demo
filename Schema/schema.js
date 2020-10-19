const graphql = require('graphql');
const Book = require('../MongoModels/book');
const Author = require('../MongoModels/author');
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

//#region Object Types
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.findById(parent.authorId);
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
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});
//#endregion

//#region Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        return Author.find({});
      },
    },
  },
});
//#endregion

//#region Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});
//#endregion

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
