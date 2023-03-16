// query / mutation is made, resolvers fetch data from db, returns the data formatted specified  
const { User, Workout, Exercise, Set } = require('../models')

const resolvers = {
  Query: {
    // gets a user by id with their workouts
    getUser: async(_, { id }) => { // { id } shorthand for { id: id }
      return await User.findById(id);
    },
    // gets all workouts by user's id
    getWorkoutsByUserId: async(_, { userid }) => {
      return await Workout.find({ userid });
    },
    // gets a exercise by id with its sets
    getExerciseByWorkoutId: async(_, { workoutid }) => {
      return await Exercise.find({  });
    }
  },
  Mutation: {
    createUser: async(_,)
  },
  // resolver for 'user' type for its 'workouts' field
  User: {
    workouts: async (parent) => {
      const workouts = await Workout.find({ user: parent.id });
      return workouts;
    }
  },
  // resolver for 'workout' type for its 'exercises' field
  Workout: {
    exercises: async (parent) => {
      const exercises = await Exercise.find({ workout: parent.id });
      return exercises;
    }
  },
  // resolver for 'exercise' type for its 'sets' field
  Exercise: {
    sets: async (parent) => {
      const sets = await Set.find({ user: parent.id });
      return sets;
    }
  }
}