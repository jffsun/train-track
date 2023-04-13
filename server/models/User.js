const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Workout = require('./Workout');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  // "tell us a little about yourself"
  bio: {
    type: String,
    required: true,
  },
  // "what do you hope to accomplish": 1. be stronger 2. be healthier 3. look better 4. other
  goals: {
    type: String,
    required: true,
  },
  workouts: [Workout.schema],
});

// fullName virtual property that is not stored in db 
userSchema.virtual('fullName').get(function(){
  return `${firstName} ${lastName}`;
})

// toJSON options whenever a document is serialized in JSON format
userSchema.set('toJSON', {
  getters: true, // allow getters which retrieve firstName and lastName
  virtuals: true, // allow virtual properties like 'fullName'
  transform: function (doc, ret) { // customizes JSON output that's returned to the client
    delete ret._id;
    delete ret.__v;
    ret.id = doc._id; // default mongoose _id to id
  }
})

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;