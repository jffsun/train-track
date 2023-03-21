// query / mutation is made, resolvers fetch data from db, returns the data formatted specified  
const { User, Workout, Exercise, Set } = require('../models')

const resolvers = {
  Query: {
    // gets a user by id with their workouts
    getUser: async(_, { id }) => { // { id } obj destructuring syntax to get the 'id' field from User model
      return await User.findById(id);
    },
    // gets all workouts by user's id
    getWorkoutsByUserId: async(_, { userId }) => {
      return await Workout.find({ userId });
    },
    // gets a exercise by workout's id
    getExerciseByWorkoutId: async(_, { workoutId }) => {
      return await Exercise.find({ workoutId });
    }
  },
  Mutation: {
    // { input } refers to deconstructed values of input object
    createUser: async(_, { input }) => {
      try {
        // extract all properties from input object
        const { name, email, password, bio, goals } = input;

        // create new user with extracted input values
        const newUser = new User({ name, email, password, bio, goals });
        await newUser.save();
        return newUser;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error creating user.");
      }
    },
    // destructures user's id and other input values for easy access within function
    updateUser: async(_, { id, input }) => {
      try {
        // returns the updated user back to client 
        const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
        return updatedUser;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating user.");
      }
    },

    deleteUser: async(_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error();
        }
        return true;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error deleting user.");
      }
    }
  },
  // resolver for 'user' type for its 'workouts' field
  User: {
    // parent object referencing the 'user' type that holds the 'workouts' field
    workouts: async (parent) => {
      const workouts = await Workout.find({ userId: parent.id });
      return workouts;
    }
  },
  // resolver for 'workout' type for its 'exercises' field
  Workout: {
    exercises: async (parent) => {
      const exercises = await Exercise.find({ workoutId: parent.id });
      return exercises;
    }
  },
  // resolver for 'exercise' type for its 'sets' field
  Exercise: {
    sets: async (parent) => {
      const sets = await Set.find({ exerciseId: parent.id });
      return sets;
    }
  }
}