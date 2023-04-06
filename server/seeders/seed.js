const db = require('../db/conn');
const userSeeds = require('./sampleUserSeed.json')
const workoutSeeds = require('./sampleWorkoutSeed.json')
const exerciseSeeds = require('./sampleExerciseSeed.json')
const setSeeds = require('./sampleSetSeed.json')

const { User, Workout, Exercise, Set } = require('../models');

db.once('open', async () => {
  try {

    // delete existing data 
    // await User.deleteMany({});
    // await Workout.deleteMany({});
    // await Exercise.deleteMany({});
    await Set.deleteMany({});

    // await User.insertMany(userSeeds);
    // await Workout.insertMany(workoutSeeds);
    // await Exercise.insertMany(exerciseSeeds);
    await Set.insertMany(setSeeds);

    // Problem: Deleting and reseeding creates new objectIds for seeded data so we cannot seed data all at once
    // Problematic because we need the objectIds beforehand before seeding data that references a parent object
    // Solution 1: Do not reseed data 
    // Solution 2: Figure out way to generate objectId, take new objectId, create new seed with new parent's objectId.
  } catch (err) {
    console.error(err);

    // if error, indicates unsuccessful termination of process 
    process.exit(1);
  }
  console.log('Data successfully seeded!');

  // successful termination of process
  process.exit(0);
});