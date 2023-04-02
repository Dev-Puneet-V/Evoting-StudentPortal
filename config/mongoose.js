const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true ,  useNewUrlParser: true})
const db = mongoose.connection;
db.once('open', function(){
  console.log('Connected to Database :: MongoDB');
});

module.exports = db;