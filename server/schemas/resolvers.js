// query / mutation is made, resolvers fetch data from db, returns the data formatted specified  
const { User, Workout, Exercise, Set } = require('../models')

const resolvers = {
  Query: {
    // gets a user by id
    user: async(_, { id }) => {
      // return user and the user's workouts too  
      return await User.findById(id).populate('workouts');
    }
  }
}