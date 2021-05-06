const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../config/dbconfig');
console.log(config.URL, 'config');
MongoClient.connect(
    config.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    function (err, client) {
        if (err) throw err;
        db = client.db(config.DB);
        console.log('mongo database connected successfull');
    },
);
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log('Node NOT Exiting...');
});

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.collection('register').insert(data, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
    },
    login:(email,password)=>{
        return new Promise((resolve,reject)=>{
            db.collection('register').find({email:email,password:password}).toArray((err,result)=>{
                err?reject(err):resolve(result);
            })
        })
    },
    createUser:(data)=>{
        return new Promise((resolve, reject) => {
            db.collection('register').insert(data, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
    },
    createBook:(bookName,author)=>{
        return new Promise((resolve,reject)=>{
            let data={
                bookName:bookName,
                author:author
            }
            db.collection('books').insert(data, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        })
    },
    getBooks:(role,email)=>{
        return new Promise((resolve,reject)=>{
            if(role==='admin'){
                db.collection('books').find({}).toArray((err, data) => {
                    err ? reject(err) : resolve(data);
                });
            }
            else{
                db.collection('books').find({email:email}).toArray((err, data) => {
                    err ? reject(err) : resolve(data);
                });
            }
        })
    },
    assignBooks:(id,user,userEmail)=>{
        return new Promise((resolve,reject)=>{
        db.collection('books').update({	"_id" : mongodb.ObjectId(id)},{$set:{status:"booked",user:user,email:userEmail}}, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    })
    },
    userTrack:(data)=>{
        return new Promise((resolve,reject)=>{
            db.collection('usertrack').insert(data, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        })
    },
    updateBook:(id,bookName,author,status,user,userEmail)=>{
        return new Promise((resolve,reject)=>{
            db.collection('books').update({	"_id" : mongodb.ObjectId(id)},{$set:{status:status,bookName:bookName,author:author,user:user,email:userEmail}}, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        })
    },
    deleteBook:(id)=>{
        return new Promise((resolve,reject)=>{
            db.collection('books').remove({"_id" : mongodb.ObjectId(id)},(err,data)=>{
                err ? reject(err) : resolve(data);
            })
        })
    },
    updateUser:(name,phone,email)=>{
        return new Promise((resolve,reject)=>{
            db.collection('register').update({	email : email},{$set:{name:name,phone:phone}}, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        })
    },
    deleteUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.collection('register').remove({"_id" : mongodb.ObjectId(id)},(err,data)=>{
                err ? reject(err) : resolve(data);
            })
        }) 
    }
};