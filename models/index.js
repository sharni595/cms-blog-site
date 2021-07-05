const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey:'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade', 
    hooks: true
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade', 
    hooks: true
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade', 
    hooks: true
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade', 
    hooks: true
});

module.exports = { User, Post, Comment };