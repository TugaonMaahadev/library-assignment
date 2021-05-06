const dao=require('../dao/dao');



module.exports={
    deleteBook:(req,res)=>{
        let {id,role}=req.body;
        if(role!=='admin'){
            res.send({Message:"You are not authorized to delete book"})
        }else{
        dao.deleteBook(id).then((data)=>{
            res.send({Message:"Book has been deleted successfuly",status:200})
        }).catch((err)=>{
            res.send({Message:"Error Found",err,status:400})
        })
    }
},
deleteUser:(req,res)=>{
    let {id,role}=req.body;
    if(role!=='admin'){
        res.send({Message:"You are not authorized to delete user"})
    }else{
    dao.deleteUser(id).then((data)=>{
        res.send({Message:"User has been deleted successfuly",status:200})
    }).catch((err)=>{
        res.send({Message:"Error Found",err,status:400})
    })
    }
}
}