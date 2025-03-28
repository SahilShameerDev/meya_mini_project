require('dotenv').config(); // import dotenv and configure it
const app = require('./src/app'); // import app

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})