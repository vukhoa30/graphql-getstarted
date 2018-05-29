import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools';

const members = [
    { name: "Yorick", age: 250 },
    { name: "Francis", age: 174 }
]

const typeDefs = `
    type Query { group: [Member] }
    type Mutation {
        addMember(name: String, age: Int): Member
    }

    type Member { name: String, age: Int }
`
const resolvers = {
    Query: { group: () => members },
    Mutation: {
        addMember: (name, age) => {
            members.push({name,age})
        }
    }
}
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const PORT = 3000

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})