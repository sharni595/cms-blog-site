const { User } = require('../models');

const users = [
    {
        username: 'sheila123',
        password: 'shiela321'
    },
    {
        username: 'lollipops',
        password: 'lalala3'
    },
    {
        username: 'honeybee',
        password: 'buzzbuzzb'
    }
]




sequelize
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate(users);
  })
  .then(() => {
    console.log('Data seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });