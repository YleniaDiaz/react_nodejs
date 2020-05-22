const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'react_test', //database
    'root', //user
    'ylenia', //password
    {
        host: 'localhost',
        dialect: 'mysql'
        //POOL
    }
);

module.exports=sequelize;