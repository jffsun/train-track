const { gql } = require('apollo-server');
const dateScalar = require('./dateScalar');

const typeDefs = gql`
  type Query {
    userQueries: UserQueries
    workoutQueries: WorkoutQueries
    exerciseQueries: ExerciseQueries
    setQueries: SetQueries
  }
  
  type UserQueries {
    getUser(id: ID!): User!
  }

  type WorkoutQueries {
    getUserWorkouts(userId: ID!): [Workout!]!
  }

  type ExerciseQueries {
    getWorkoutExercises(workoutId: ID!): [Exercises!]!
  }

  type SetQueries {
    getExerciseSets(exerciseId: ID!): [Sets!]!
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
    name: String!
    email: String!
    password: String!
    bio: String!
    goals: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    email: String
    password: String
    bio: String
    goals: String
  }

  input CreateWorkoutInput {
    name: String!
    userId: ID!
  }

  input UpdateWorkoutInput {
   id: ID!
   name: String
   exercises: [UpdateExerciseInput!]
  }

  input CreateExerciseInput {
    name: String!
    workoutId: ID!
  }

  input UpdateExerciseInput {
   id: ID!
   name: String
  }

  scalar Date

  input CreateSetInput {
    exerciseId: ID!
    stats: Stats!
    personal_record: Boolean
    date: Date!
  }

  input UpdateSetInput {
   id: ID!
   stats: Stats
   personal_record: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    bio: String!
    goals: String!
    workouts: [Workout]
  }

  type Workout {
    id: ID!
    name: String!
    userId: 
    exercises: [Exercise]
  }  

  type Exercise {
    id: ID!
    name: String!
    sets: [Set]
  }  

  type Set {
    id: ID!
    stats: Stats
    personal_record: Boolean
    date: Date!
  }  

  type Stats {
    weight: Float!
    reps: Int!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = typeDefs, dateScalar;
