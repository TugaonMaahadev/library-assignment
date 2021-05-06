const dao =require("../dao/dao");

module.exports={
    register:(req,res)=>{
        let {name,email,phone,password}=req.body;
        let data={
            name:name,
            email:email,
            phone:phone,
            password:password,
            role:"admin"
        }
        dao.register(data).then((data)=>{
            res.send({Message:"Succsessfully registered",status:200})
        }).catch((err)=>{
            res.send({Message:"Error Found",err,status:400})
        })
    },
    createUser:(req,res)=>{
        let {name,email,phone,password,loggedInUser}=req.body;
        let data={
            name:name,
            email:email,
            phone:phone,
            password:password,
            role:"user"
        }
        if(loggedInUser!=='admin'){
        res.send({Message:"You are not authorized to create user"})
        }else{
            dao.createUser(data).then((data)=>{
                res.send({Message:"user succsessfully registered",status:200})
        }).catch((err)=>{
            res.send({Message:"Error Found",err,status:400})
        })
    }
    },
    createBook:(req,res)=>{
        let {bookName,author}=req.body;
        dao.createBook(bookName,author).then((data)=>{
            res.send({Message:"book succsessfully added",status:200})
    }).catch((err)=>{
        res.send({Message:"Error Found",err,status:400})
    })
    },
    assignBooks:(req,res)=>{
        let {id,bookName,user,userEmail}=req.body;
        dao.assignBooks(id,user,userEmail).then((data)=>{
            let obj={
                id:id,
                bookName:bookName,
                user:user,
                userEmail:userEmail
            }
          dao.userTrack(obj).then((data)=>{
                res.send({Message:"succsessfully assigned book to user",status:200})
          }).catch((err)=>{
            res.send({Message:"Error Found",err,status:400})
        })
    }).catch((err)=>{
        res.send({Message:"Error Found",err,status:400})
    })
    }
}