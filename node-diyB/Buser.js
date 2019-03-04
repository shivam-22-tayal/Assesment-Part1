const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const dbName = 'normal_users'
// find All Users
const BfetchAll = (callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('busers').find({}).toArray((err,data)=>{
                callback(data)
            })
        client.close()
    })
}
// find Users by Name
const BfetchByName= (uname,callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('busers').find({ name: uname}).toArray((err,results)=>{
            callback(results)
        })
        client.close()
    })
}
const BaddUser = (user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('busers')
        collection.insert(user)
        callback(err)
        console.log(err)
        client.close()
    })
}
const BeditUser = (user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('busers')
        collection.updateOne({ _id : user._id }
            , { $set: user  },(err,response)=>{
                callback(err,response)
            })
            client.close()
    })
}
const BgetLastId = (callback)=>{
    MongoClient.connect(url,(err,client)=>{
        client.db(dbName).collection('busers').find({}).sort({_id:-1}).limit(1).toArray((err,data)=>{
            if(data.length>0){
                callback(data[0]._id,err)
            }else{
                callback(0,err)
            }
        })
    })
}
module.exports = {
    BfetchAll : BfetchAll,
    BfetchByName : BfetchByName,
    BaddUser : BaddUser,
    BeditUser :BeditUser,
    BgetLastId
}