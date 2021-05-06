const dao = require('../dao/dao');


module.exports = {
    login: (req, res) => {
        let { email, password } = req.body;
        dao.login(email, password).then((data) => {
            data.length===0?res.send({Message:"user or password not matched",status:400}):res.send({ Message: "Login succsessfully!!!", status: 200 });
        }).catch((err)=>{
            res.send({ Message: "Error Found", err, status: '400'})
        });
    },
    getBooks:(req,res)=>{
        let {role,email}=req.body;
        dao.getBooks(role,email).then((data)=>{
            res.send({Message:"Successfully returned data",data:data,status:200})
        }).catch((err)=>{
            res.send({Message:"Error Found",err,status:400})
        })
    }

};