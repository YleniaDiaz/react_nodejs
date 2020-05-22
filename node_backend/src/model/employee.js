const Sequelize = require('sequelize');
const sequelize = require('./database');

//import Role for FK roleID
const Role = require('./role');

const NAME_TABLE = 'employee'; 
const Employee =sequelize.define(NAME_TABLE, 
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
        phone: Sequelize.STRING,
        //FK
        roleId: {
            type: Sequelize.INTEGER,
            reference: {
                model: Role,
                key: 'id'
            }
        }
    },
    {
        //remove creaateAt y updated
        timestamps: false
    }
);

Employee.belongsTo(Role);

module.exports=Employee;