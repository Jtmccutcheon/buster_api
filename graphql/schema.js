const schema = `#graphql
    type Query {
        busters: [Buster]
        buster(id: ID!): Buster!
        busterByDate(date: String): Buster
        bustersWithin(startDate: String, endDate: String): [Buster]
        bustersByUsernames(usernames: [String]!): [Buster]
        bustersByUsernamesWithin(usernames: [String]!, startDate: String!, endDate: String! ): [Buster]
        bustersByYear(year: String!): [Buster]
        bustersOTM(year: String!): [BusterOTM]
        bustersOTY(year: String!): [BusterOTY]
        busterLongestDry: [BusterLongestDry]
    }

    type Buster {
        id: ID!
        username: String!
        discordId: String
        avatarUrl: String!
        datesWon: [String]!
    }

    type BusterLongestDry {
        id: ID!
        username: String!
        discordId: String
        avatarUrl: String!
        d1: String
        d2: String
        diff: Int
    }

    type BusterOTM {
        year: String!
        month: String!
        busters: [Buster]
    }

    type BusterOTY {
        year: String!
        busters: [Buster]
    }
`;

module.exports = schema;
