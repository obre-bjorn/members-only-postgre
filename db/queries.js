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


async function deleteMessage(id){


    res.send(`This ${req.body.id}  to be deleted`)
}


async function grantMembership(id){


    try {

        const query = "UPDATE users SET membership_status = TRUE WHERE id = $1"
        
        await db.query(query,[id])

    

    }catch(err){
        cosnolelog("Error: ", err)
    }
}



async function getAllMessages(){

    const query = `
    SELECT m.*, u.first_name, u.last_name 
    FROM messages m 
    JOIN users u ON m.author_id = u.id
    ORDER BY m.timestamp DESC
  `;
    const result = await db.query(query);
    const messages = result.rows;


    return messages
}

module.exports = {
    createtUser,
    createMessage,
    grantMembership,
    getAllMessages
}