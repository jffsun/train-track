const { Schema, model } = require('mongoose');

const setSchema = new Schema ({
  stats: [{
    weight: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    }
  }],
  personal_record: {
    type: Boolean,
  },
  date: {
    type: Date, 
    default: Date.now 
  },
  }, 
  {
    // converts the mongoose document into a json object
    toJSON: {
        getters: true,
    },
      id: false,
    },
);

const Set = model('Set', setSchema);

module.exports = Set;
