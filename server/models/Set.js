const { Schema, model } = require('mongoose');

const setSchema = new Schema ({
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  weight: {
    type: Number
  },
  reps: {
    type: Number
  },
  time: {
    type: Number
  },
  personal_record: {
    type: Boolean,
  },
  date: {
    type: Date, 
    default: Date.now,
    required: true
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
