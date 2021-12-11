// const { buildSchema } = require('graphql');

const schema = `
    type Query {
        busters: [Buster]!
        buster(id: ID!): Buster!
        busterByDate(date: String): Buster!
        bustersWithin(startDate: String, endDate: String): [Buster]!
        bustersByUsernames(usernames: [String]!): [Buster]!
    }

    type Buster {
        id: ID!
        discordId: String!
        username: String!
        avatarUrl: String!
        datesWon: [String]!
    }
`;

module.exports = schema;
