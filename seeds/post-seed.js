const { Post } = require('../models');

const posts = [
    {
        title: 'How to get out of bed',
        contents: 'Just do it',
        user_id: 2
    },
    {
        title: 'How to stay in bed all day',
        contents: 'Its really not that hard',
        user_id: 1
    }
]

sequelize
  .sync({ force: true })
  .then(() => {
    return Post.bulkCreate(posts);
  })
  .then(() => {
    console.log('Data seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });