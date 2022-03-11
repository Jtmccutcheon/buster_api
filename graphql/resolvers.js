const Busters = require('../models/Buster');
const BusterOTM = require('../models/BusterOTM');
const BusterOTY = require('../models/BusterOTY');
const moment = require('moment');

const resolvers = {
  Query: {
    busters: async (_, obj) => {
      const busters = await Busters.find({});
      return busters;
    },
    buster: async (_, obj) => {
      const { id } = obj;
      const busters = await Busters.findById(id);
      return busters;
    },
    busterByDate: async (_, obj) => {
      const { date } = obj;
      const busters = await Busters.find({});
      const find = busters.filter(b => {
        const { datesWon } = b;
        return datesWon.filter(d => d.startsWith(date)).length > 0;
      });
      return find.find(i => i);
    },
    bustersWithin: async (_, obj) => {
      const { startDate, endDate } = obj;
      const busters = await Busters.find({});
      const find = busters.filter(b => {
        const { datesWon } = b;
        const datesWithin = datesWon.filter(d =>
          moment(d).isBetween(startDate, moment(endDate).endOf('day')),
        );
        return datesWithin.length > 0;
      });
      const busterDoodle = find.map(b => {
        return {
          id: b.id,
          username: b.username,
          avatarUrl: b.avatarUrl,
          datesWon: b.datesWon.filter(d =>
            moment(d).isBetween(startDate, moment(endDate).endOf('day')),
          ),
        };
      });
      return busterDoodle;
    },
    bustersByUsernames: async (_, obj) => {
      const { usernames } = obj;
      const busters = await Busters.find({});
      const find = busters.filter(b => usernames.includes(b.username));
      return find;
    },
    bustersByUsernamesWithin: async (_, obj) => {
      const { usernames, startDate, endDate } = obj;
      const busters = await Busters.find({});
      const find = busters.filter(b => {
        const { datesWon } = b;
        const dates = datesWon.filter(d =>
          moment(d).isBetween(startDate, moment(endDate).endOf('day')),
        );

        return dates.length > 0;
      });

      const busterDoodle = find.map(b => {
        return {
          id: b.id,
          username: b.username,
          avatarUrl: b.avatarUrl,
          datesWon: b.datesWon.filter(d =>
            moment(d).isBetween(startDate, moment(endDate).endOf('day')),
          ),
        };
      });

      return busterDoodle.filter(b => usernames.includes(b.username));
    },
    bustersByYear: async (_, obj) => {
      const { year } = obj;
      const busters = await Busters.find({});

      const filtered = busters.filter(b =>
        b.datesWon.some(d => d.startsWith(year)),
      );

      return filtered.map(b => ({
        id: b.id,
        username: b.username,
        avatarUrl: b.avatarUrl,
        datesWon: b.datesWon.filter(d => d.startsWith(year)),
      }));
    },
    bustersOTM: async (_, obj) => {
      const { year } = obj;
      return BusterOTM.find({ year });
    },
    bustersOTY: async (_, obj) => {
      const { year } = obj;
      return BusterOTY.find({ year });
    },
  },
};

module.exports = resolvers;
