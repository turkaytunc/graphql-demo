require('dotenv').config();
const app = require('express')();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}.`);
});
