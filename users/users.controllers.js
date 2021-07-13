const {MongoClient} = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://curso-nodejs:curso-nodejs@cluster0.bdxrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const addUser = async ({name, lastName, surName}) => {
    const client = new MongoClient(uri, {userNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        const userCollection = client.db('users').collection('users');
        const existRegister = await userCollection.find({
            name,
            lastName,
            surName
        })
        const user = []
        await existRegister.forEach(item => {
            user.push(item);
        })
        if(user.length === 0) {
            const {insertedId} = await userCollection.insertOne({
                name, lastName, surName
            });
            return Promise.resolve(insertedId);
        }
        await client.close();
        return Promise.reject({
            message: 'Can not create a register',
            userExistWithId: user[0]._id
        })
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

//Updating
const updUser = async (id,{name, lastName, surName}) => {
    const idFromParams = new ObjectId(id);
    const filterQry = {_id: idFromParams}
    const objToUpd = {
        name, lastName, surName
    }
    console.log("Getting into controllers-upd");
    console.log(id)
    const client = new MongoClient(uri, {userNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        const userCollection = client.db('users').collection('users');
        //const existOneRegister = await userCollection.findOne(filterQry)
        //console.log(existOneRegister)
        if(existOneRegister != null) {
            console.log("User exists");
            const updatedUser = await userCollection.findOneAndUpdate(
                {_id: idFromParams},
                {$set: {
                    name, lastName, surName
                }});
            console.log("After updated user");
            console.log(updatedUser.value);
            return Promise.resolve(updatedUser.value);
        }
        
        await client.close();
        return Promise.reject({
            message: 'Can not update a register',
            userExistWithId: existOneRegister._id
        })
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}
//Endign update

//Deleting
const delUser = async (id) => {
    const idFromParams = new ObjectId(id);
    const filterQry = {_id: idFromParams}
    console.log("Getting into controllers-del");
    console.log(id)
    const client = new MongoClient(uri, {userNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        const userCollection = client.db('users').collection('users');
        console.log("About to delete an existing user");
        const delUser = await userCollection.deleteOne(filterQry)
        if(delUser.deletedCount === 1) {
            console.log("User deleted successfully");
            console.log(delUser)
            return Promise.resolve(delUser);
        }
        
        await client.close();
        return Promise.reject({
            message: 'Can not delete a register',
            userExistWithId: existOneRegister._id
        })
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}
//Endign delete

const getAllUsers = () => {
    const client = new MongoClient(uri, {userNewUrlParser: true, useUnifiedTopology: true});
    const users = new Promise((resolve, reject) => {
        client.connect(err => {
            if(err) {
                reject(err);
            }
            const userCollection = client.db("users").collection("users");
            const cursorUsers = userCollection.find({});
            const data = []
            cursorUsers.forEach(item => {
                console.log(item);
                data.push(item);
            }).then(finish => {
                console.log(finish, 'El resultado')
                resolve(data);
                client.close();
            });
        });
        
    })
    return users;
    
}

/*Optional
module.exports.addUser = addUser
module.exports.getAllUsers = getAllUsers*/

module.exports = {
    addUser,
    updUser,
    delUser,
    getAllUsers
}