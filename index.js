require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.PORT || 3001;

// Middleware

app.use(cors());
app.use(helmet());

// Test

app.get('/', (req, res) => {
  res.status(200).send('Hello From Express');
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}.`);
});
