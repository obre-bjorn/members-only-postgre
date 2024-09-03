const db = require("./pool")


async function createtUser({firstname,lastname,email,password}){


    try{

        const query = `INSERT INTO users (first_name,last_name,email,password) VALUES ($1, $2, $3, $4) `
        const values = [firstname, lastname,email,password]
    
        await db.query(query,values)

    }catch(error){

        console.log(error)
    }
    

}


async function createMessage({title, content}, user){
    
    try{

        const query = `INSERT INTO messages (title, content,author_id ) VALUES ($1, $2, $3)`
        const values = [title,content, user.id]


        await db.query(query,values)



    }catch(error){

        console.log(error)
        return

    }


}


module.exports = {
    createtUser,
    createMessage
}