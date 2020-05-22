const controller = {}

const sequelize = require('../model/database');
const Employee = require('../model/employee');
const Role = require('../model/role');

sequelize.sync();

controller.list = async(req, res)=>{
    const data = await Employee.findAll(
        {
            include: [Role]
        }
    ).then(function(data){
        return data
    }).catch(error =>{
        console.log(`ERROR LIST EMPLOYEE -> ${error}`);
        return error;
    });

    res.json({success: true, data: data});
};

controller.create = async (req, res) => {
    //DATA FROM POST
    const {name, email, address, phone, role} = req.body;

    const data = await Employee.create({
        name: name, 
        email: email,
        address: address, 
        phone: phone,
        roleId: role
    }).then(function(data){
        return data;
    }).catch(error=>{
        console.log(`ERROR CREATE EMPLOYEE -> ${error}`);
        return error;
    });

    res.status(200).json({
       success: true, 
       message: 'INSERT OK',
       data: data
    });
};

controller.get= async(req, res)=>{
    const {id}=req.params;

    const data = await Employee.findAll(
        {
            where: {id},
            include: [Role]
        }
    ).then(function(data){
        return data;
    }).catch(error=>{
        console.log(`ERROR GET EDIT -> ${error}`);
        return error;
    });

    res.json({success: true, data: data});
};

controller.update=async (req, res)=>{
    const {id}=req.params;

    //PARAMETER POST
    const {name, email, phone, address, role} = req.body;

    //UPDATE
    const data = await Employee.update(
        {
            name: name, 
            email: email,
            phone: phone, 
            address: address,
            roleId: role
        },
        {
            where: {id}
        }
    ).then(function(data){
        return data;
    }).catch(error=>{
        console.log(`ERROR UPDATE -> ${error}`);
        return error;
    });

    res.json({success: true, data: data, message: 'UPDATE OK'});
};

controller.delete=async (req, res)=>{
    const {id} = req.body;

    const dataDelete = await Employee.destroy({
        //where: {id: id}
        where: {id}
    });

    res.json({success: true, deleted: dataDelete, message: 'DELETE OK'});
};

module.exports=controller;