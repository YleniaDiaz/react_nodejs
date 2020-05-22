const Sequelize = require('sequelize');
const sequelize = require('./database');

const NAME_TABLE = 'role'; 
const Role =sequelize.define(NAME_TABLE, 
    {
        role: Sequelize.STRING
    },
    {
        //remove creaateAt y updated
        timestamps: false
    }
);

module.exports=Role;