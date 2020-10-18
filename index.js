require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/schema');

const PORT = process.env.PORT || 3001;

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
