const { GraphQLScalarType } = require('graphql')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'A Date type',
  parseValue(value) {
    // Convert incoming value to Date object if possible
    return new Date(value)
  },
  serialize(value) {
    // Convert outgoing Date object to ISO string
    return value.toISOString()
  },
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      // Parse incoming string literal to Date object
      return new Date(ast.value)
    }
    return null
  },
})

module.exports = dateScalar
