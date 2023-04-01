const db = require('../db/conn');
const { User } = require('../models');
const userSeeds = require('./sampleUserSeed.json')
// const { User, Workout, Exercise, Set } = require('../models');

db.once('open', async () => {
  try {

    // delete existing data 
    await User.deleteMany({});
    // await Workout.deleteMany({});
    // await Exercise.deleteMany({});
    // await Set.deleteMany({});

    await User.insertMany(userSeeds);

  } catch (err) {
    console.error(err);

    // if error, indicates unsuccessful termination of process 
    process.exit(1);
  }
  console.log('Data successfully deleted and seeded!');

  // successful termination of process
  process.exit(0);
});