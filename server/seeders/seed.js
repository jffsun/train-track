const mongoose = require('mongoose');
const connectToServer = require('./db/conn');
const { User, Workout, Exercise, Set } = require('../models');

const users = require ('./userSeeds.json')
const workouts = require ('./workoutSeeds.json')
const exercises = require ('./exerciseSeeds.json')
const sets = require ('./setSeeds.json')



async function seedDatabase() {
  // Connect to the database
  await connectToServer();

  // Insert the test data into the database
  await Promise.all([
    User.insertMany(users),
    // Workout.insertMany(workouts),
    // Exercise.insertMany(exercises),
    // Set.insertMany(sets),
  ]);

  console.log('Database seeded successfully');

  // Disconnect from the database
  await mongoose.disconnect();
}

seedDatabase().catch(console.error);