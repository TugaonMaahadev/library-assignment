const dao=require('../dao/dao');



module.exports={
    updateBook:(req,res)=>{
        let {id,bookName,author,status,user,email,role}=req.body;
        if(role!=='admin'){
            res.send({Message:"You are not authorized to update book"})
        }else{
        dao.updateBook(id,bookName,author,status,user,email).then((data)=>{
            res.send({Message:"Book updated successfuly",status:200})
        }).catch((err)=>{
            res.send({Message:"Error Found",status:400})
        })
    }
    },
    updateUser:(req,res)=>{
        let {name,phone,email,role}=req.body;
        if(role!=='admin'){
            res.send({Message:"You are not authorized to update user"})
        }else{
            dao.updateUser(name,phone,email).then((data)=>{
                res.send({Message:"Book updated successfuly",status:200})
            }).catch((err)=>{
                res.send({Message:"Error Found",status:400})
            })
        }
    }
}