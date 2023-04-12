// query / mutation is made, resolvers fetch data from db, returns the data formatted specified  
const { User, Workout, Exercise, Set } = require('../models')

const resolvers = {
  Query: {
    // gets a user by id with their workouts
    getUser: async (_, { id }) => { // { id } obj destructuring syntax to get the 'id' field from User model
      try{ 
        // await inside async function forces function to resolve/reject before continuing
        const user = await User.findById(id)
        if (!user) {
          throw new Error(`User with ID: ${id} not found.`);
        }
        return user;
      }
      catch(error) {  
        console.error(error);
        throw new Error("Error finding user.");
      }
    },
    // gets all workouts by user's id
    getWorkoutsByUserId: async (_, { userId }) => {
      try {
        const workouts = await Workout.find({ userId });
        if (!workouts) {
          throw new Error(`Workouts under User ID: ${userId} cannot be found.`);
        }
        return workouts;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error finding workouts.");
      }
    },
    // gets a exercise by workout's id
    getExercisesByWorkoutId: async (_, { workoutId }) => {
      try {
        const exercises = await Exercise.find({ workoutId });
        if (!exercises) {
          throw new Error(`Exercises under Workout ID: ${workoutId} cannot be found.`);
        }
        // map through returned exercises
        return exercises.map(exercise => ({ ...exercise.toObject(), // convert document to js object copying exercise properties to new array
          id: exercise._id // id property of exercise obj in new array set to _id of mongoose document
        }));
      } catch(error) {
        console.error(error);
        throw new Error("Error finding exercises.");
      }
    },
    getSetsByExerciseId: async (_, { exerciseId }) => {
      try {
       const sets = await Set.find({ exerciseId })
       if (!sets) {
        throw new Error(`Sets with Exercise ID: ${exerciseId} cannot be found.`);
       }
       return sets;
      }
      catch(error) { 
        console.error(error);
        throw new Error("Error finding sets.");
      }
    }
  },
  Mutation: {
    userMutations: () => ({}),
    workoutMutations: () => ({}),
    exerciseMutations: () => ({}),
    setMutations: () => ({})
  },
  UserMutations: {
    // accepts deconstructed values of input object
    createUser: async (_, { input }) => {
    try {
      // create newUser object
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    }
    catch(error) {
      console.error(error);
      throw new Error("Error creating user.");
    }
    },
    // destructures user id and input values for easy access
    updateUser: async (_, { input }) => { // TO DO: logic to decrypt hashed password, update, rehash
      const { id } = input; // extract the id from the input object
      if (!id) {
        throw new Error("User ID is required.");
      }
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
    // destructure id from input object access in function
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
    }
  },
  WorkoutMutations: {
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
    updateWorkout: async (_, { input }) => {
      const { id } = input; // extract the id from the input object
      if (!id) {
        throw new Error("Workout ID is required.");
      }
      try {
        const updatedWorkout = await Workout.findByIdAndUpdate(id, input, { new: true });
        if (!updatedWorkout) {
          throw new Error(`Workout with ID: ${id} not found.`);
        }
        // explicitly restate updated workout's id in case lost in update process
        updatedWorkout.id = id;
        return updatedWorkout; 
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating workout.");
      }
    },    
    deleteWorkout: async (_, { id } ) => {
      try {
        deletedWorkout = await Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
          throw new Error(`Workout with ID: ${id} not found.`);
        }
        return true
      }
      catch(error) {
        console.error(error);
        throw new Error("Error deleting workout.")
      }
    }
  },
  ExerciseMutations: {
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
    updateExercise: async (_, { input }) => {
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
        throw new Error("Error deleting exercise.");
      }
    }
  },
  SetMutations: {
    createSet: async (_, { input }) => {
      try {
        const newSet = new Set(input);
        await newSet.save();
        return newSet;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error creating set.");
      }
    },
    updateSet: async (_, { input }) => {
      try {
        const updatedSet = Set.findByIdAndUpdate(id, input, { new: true });
        if (!updatedSet) {
          throw new Error(`Set with ID: ${id} not found.`);
        }
        return updatedSet;
      }
      catch(error) {
        console.error(error);
        throw new Error("Error updating set.");
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
  User: {   // resolver for workouts field for user parent obj
    // parent object referencing the 'user' type that holds the 'workouts' field
    workouts: async (parent) => {
      const workouts = await Workout.find({ userId: parent.id });
      return workouts;
    }
  },
  // resolver for exercises field for workout parent obj
  Workout: {
    exercises: async (parent) => {
      const exercises = await Exercise.find({ workoutId: parent.id });
      return exercises;
    }
  },
  // resolver for sets field for exercise parent obj
  Exercise: {
    sets: async (parent) => {
      const sets = await Set.find({ exerciseId: parent.id });
      return sets;
    }
  }
};

module.exports = resolvers;