const { gql } = require('apollo-server');
const dateScalar = require('./dateScalar');

const typeDefs = gql`
  type Query {
    Workouts: [Workout]
    Exercise: [Exercise]
    me: User
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User
    createWorkout(name: String!): Workout
    addExercise(name: String!): Exercise
    addSet(input: AddSetInput!): Set
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input AddSetInput {
    weight: Int
    repetitions: Int
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    workouts: [Workout]
  }

  type Workout {
    id: ID!
    name: String!
    exercises: [Excercise]
  }  

  type Exercise {
    id: ID!
    set: [Set]
  }  

  scalar Date

  type Set {
    id: ID!
    stats: [Stat] 
    personal_record: Boolean
    date: Date
  }  

  type Stat {
    weight: Int!
    reps: Int!
  }


  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

module.exports = typeDefs, dateScalar;
