const mysql= require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'r00tUlsa',
    database:'biblioteca',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

async function testConnection(){
    try{
        const connection=await pool.promise().getConnection()
        console.log('todo cool')
        connection.release()
        return true
    }catch(error){
        console.error('revisa perry')
        return false
    }
}

module.exports={pool:pool.promise(),testConnection}