// query / mutation is made, resolvers fetch data from db, returns the data formatted specified  
const { User, Workout, Exercise, Set } = require('../models')

const resolvers = {
  Query: {
    // gets a user by id with their workouts
    getUser: async (_, { id }) => { // { id } obj destructuring syntax to get the 'id' field from User model
      return await User.findById(id);
    },
    // gets all workouts by user's id
    getWorkoutsByUserId: async (_, { userId }) => {
      return await Workout.find({ userId });
    },
    // gets a exercise by workout's id
    getExerciseByWorkoutId: async (_, { workoutId }) => {
      return await Exercise.find({ workoutId });
    }
  },
  Mutation: {
    // { input } refers to deconstructed values of input object
    createUser: async (_, { input }) => {
      try {
        const newUser = new User(input);
        await newUser.save();
        return newUser;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error creating user.");
      }
    },
    // destructures user's id and input values for easy access within function
    updateUser: async (_, { id, input }) => {
      try {
        // returns the updated user back to client 
        const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
        if (!updatedUser) {
          throw new Error("User not found.");
        }
        return updatedUser;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating user.");
      }
    },
    // destructure id from user input object to use in function
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error(`User with ID: ${id} not found.`);
        }
        return true;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error deleting user.");
      }
    },
    createWorkout: async (_, { input }) => {
      try {
        const newWorkout = new Workout(input);
        await newWorkout.save();
        return newWorkout;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error creating workout.");
      }
    },
    updateWorkout: async (_, { id, input }) => {
      try {
        const updatedWorkout = Workout.findByIdAndUpdate(id, input, { new: true });
        if (!updatedWorkout) {
          throw new Error(`Workout with ID: ${id} not found.`);
        }
        return updatedWorkout; 
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating workout.");
      }
    },
    deleteWorkout: async (_, { id }) => {
      try {
        deletedWorkout = Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
          throw new Error(`Workout with ID: ${id} not found.`);
        }
        return true
      }
      catch(error) {
        console.error(error);
        throw new Error("Error deleting workout.")
      }
    },
    createExercise: async (_, { input }) => {
      try {
        const newExercise = new Exercise(input);
        await newExercise.save();
        return newExercise;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error creating exercise.");
      }
    },
    updateExercise: async (_, { id, input }) => {
      try {
        const updatedExercise = Exercise.findByIdAndUpdate(id, input, { new: true });
        if (!updatedExercise) {
          throw new Error(`Exercise with ID: ${id} not found.`);
        }
        return updatedExercise;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating exercise.");
      }
    },
    deleteExercise: async (_, { id }) => {
      try {
        const deletedExercise = Exercise.findByIdAndDelete(id);
        if (!deletedExercise) {
          throw new Error(`Exercise with ID: ${id} not found.`);
        }
        return true;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error deleting exercise.")
      }
    },
    createSet: async (_, { input }) => {
      try {
        const newSet = new Set(input);
        await newSet.save();
        return newSet;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error creating set.")
      }
    },
    updateSet: async (_, { id, input }) => {
      try {
        const updatedSet = Set.findByIdAndUpdate(id, input, { new: true });
        if (!updatedSet) {
          throw new Error(`Set with ID: ${id} not found.`);
        }
        return updatedSet;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating set.")
      }
    },
    deleteSet: async (_, { id }) => {
      try {
        const deletedSet = Set.findByIdAndDelete(id);
        if (!deletedSet) {
          throw new Error(`Set with ID: ${id} not found.`);
        }
        return true;
      }
      catch(error) {
        console.error("Error deleting set.");
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