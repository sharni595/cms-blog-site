const { Comment } = require('../models');

const comments = [
    {
        comment_text: 'this is great, man',
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: 'unbelievable',
        user_id: 1,
        post_id: 2
    },
    {
        comment_text: 'Super bueno',
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: 'radical',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'cool cool cool',
        user_id: 2,
        post_id: 2
    },
]

sequelize
  .sync({ force: true })
  .then(() => {
    return Comment.bulkCreate(comments);
  })
  .then(() => {
    console.log('Data seeded!');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });