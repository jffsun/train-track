const mongoose = require('mongoose');

// connect to database with mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/train-track', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = mongoose.connection;