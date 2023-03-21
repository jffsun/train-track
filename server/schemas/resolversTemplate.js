const Mutation = {
  createUser: async (_, { input }) => {
    try {
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user.");
    }
  },
  updateUser: async (_, { id, input }) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating user.");
    }
  },
  deleteUser: async (_, { id }) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("User not found.");
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting user.");
    }
  },
  createWorkout: async (_, { input }) => {
    try {
      const newWorkout = new Workout(input);
      await newWorkout.save();
      return newWorkout;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating workout.");
    }
  },
  updateWorkout: async (_, { id, input }) => {
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(id, input, { new: true });
      return updatedWorkout;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating workout.");
    }
  },
  deleteWorkout: async (_, { id }) => {
    try {
      const deletedWorkout = await Workout.findByIdAndDelete(id);
      if (!deletedWorkout) {
        throw new Error("Workout not found.");
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting workout.");
    }
  },
  createExercise: async (_, { input }) => {
    try {
      const newExercise = new Exercise(input);
      await newExercise.save();
      return newExercise;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating exercise.");
    }
  },
  updateExercise: async (_, { id, input }) => {
    try {
      const updatedExercise = await Exercise.findByIdAndUpdate(id, input, { new: true });
      return updatedExercise;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating exercise.");
    }
  },
  deleteExercise: async (_, { id }) => {
    try {
      const deletedExercise = await Exercise.findByIdAndDelete(id);
      if (!deletedExercise) {
        throw new Error("Exercise not found.");
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting exercise.");
    }
  },
  createSet: async (_, { input }) => {
    try {
      const newSet = new Set(input);
      await newSet.save();
      return newSet;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating set.");
    }
  },
  updateSet: async (_, { id, input }) => {
    try {
      const updatedSet = await Set.findByIdAndUpdate(id, input, { new: true });
      return updatedSet;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating set.");
    }
  },
  deleteSet: async (_, { id }) => {
    try {
      const deletedSet = await
