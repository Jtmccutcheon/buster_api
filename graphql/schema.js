const schema = `
    type Query {
        busters: [Buster]
        buster(id: ID!): Buster!
        busterByDate(date: String): Buster
        bustersWithin(startDate: String, endDate: String): [Buster]
        bustersByUsernames(usernames: [String]!): [Buster]
        bustersByUsernamesWithin(usernames: [String]!, startDate: String!, endDate: String! ): [Buster]
        bustersByYear(year: String): [Buster]
    }

    type Buster {
        id: ID!
        username: String!
        avatarUrl: String!
        datesWon: [String]!
    }
`;

module.exports = schema;
