const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB)
.then(() => console.log('DB connected'))
.catch(error => console.error(error))