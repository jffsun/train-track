const { Schema, model } = require('mongoose');
const Set = require('./Set');

const exerciseSchema = new Schema ({
      name: {
        type: String,
        required: true,
        trim: true,
      },
      sets: [Set.schema],
    },
    {
      // converts the mongoose document into a json object
      toJSON: {
          getters: true,
      },
        id: false,
    },
);

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
