// typedefs define the "shape" of the data
const { gql } = require('apollo-server-express');
const dateScalar = require('./dateScalar');

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User!
    getWorkoutsByUserId(userId: ID!): [Workout!]!
    getExercisesByWorkoutId(workoutId: ID!): [Exercise!]!
    getSetsByExerciseId(exerciseId: ID!): [Set!]!
  }
  
  type Mutation {
    userMutations: UserMutations
    workoutMutations: WorkoutMutations
    exerciseMutations: ExerciseMutations
    setMutations: SetMutations
  }

  type UserMutations {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  type WorkoutMutations {
    createWorkout(input: CreateWorkoutInput!): Workout!
    updateWorkout(input: UpdateWorkoutInput!): Workout!
    deleteWorkout(id: ID!): Boolean!
  }

  type ExerciseMutations {
    createExercise(input: CreateExerciseInput!): Exercise!
    updateExercise(input: UpdateExerciseInput!): Exercise!
    deleteExercise(id: ID!): Boolean!
  }

  type SetMutations {
    createSet(input: CreateSetInput!): Set!
    updateSet(input: UpdateSetInput!): Set!
    deleteSet(id: ID!): Boolean!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    bio: String!
    goals: String!
  }

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    bio: String
    goals: String
  }

  input CreateWorkoutInput {
    userId: ID!
    name: String!
  }

  input UpdateWorkoutInput {
   id: ID!
   name: String
   exercises: [UpdateExerciseInput!]
  }

  input CreateExerciseInput {
    workoutId: ID!
    name: String!
  }

  input UpdateExerciseInput {
   id: ID!
   name: String
  }

  scalar Date

  input CreateSetInput {
    exerciseId: ID!
    weight: Float
    reps: Int
    time: Int
    personal_record: Boolean
    date: Date!
  }

  input UpdateSetInput {
   id: ID!
   weight: Float
   reps: Int
   Time: Int   
   personal_record: Boolean
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    bio: String!
    goals: String!
    workouts: [Workout]
    fullName: String!
  }

  type Workout {
    id: ID!
    userId: ID!
    name: String!
    exercises: [Exercise]
  }  

  type Exercise {
    id: ID!
    workoutId: ID!
    name: String!
    sets: [Set]
  }  

  type Set {
    id: ID!
    exerciseId: ID!
    warm_up: Boolean
    weight: Float
    reps: Int
    time: Int
    personal_record: Boolean
    notes: String
    date: Date!
  }  

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs, dateScalar;
