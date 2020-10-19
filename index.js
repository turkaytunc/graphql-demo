require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/schema');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const DBUSERNAME = process.env.DBUSERNAME;
const DBPASSWORD = process.env.DBPASSWORD;
const DBNAME = 'gQL';
const DBURI = `mongodb+srv://${DBUSERNAME}:${DBPASSWORD}@codecamp-graphql.ihj2d.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

// Middleware

app.use(cors());
app.use(
  helmet({
    // Todo remove unsafe options
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self' 'unsafe-inline' 'unsafe-eval'"],
        styleSrc: ["'self' 'unsafe-inline'"],
      },
    },
  })
);
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// Test

app.get('/', (req, res) => {
  res.status(200).send('Hello From Express');
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}.`);
});
