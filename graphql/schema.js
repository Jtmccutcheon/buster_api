const schema = `
    type Query {
        busters: [Buster]
        buster(id: ID!): Buster!
        busterByDate(date: String): Buster
        bustersWithin(startDate: String, endDate: String): [Buster]
        bustersByUsernames(usernames: [String]!): [Buster]
        bustersByUsernamesWithin(usernames: [String]!, startDate: String!, endDate: String! ): [Buster]
        bustersByYear(year: String): [Buster]
        bustersOTM(month: String, year: String): BusterOTM
        bustersOTY(year: String): BusterOTY
    }

    type Buster {
        id: ID!
        username: String!
        avatarUrl: String!
        datesWon: [String]!
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
