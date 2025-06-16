const mysql = require('mysql2');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datos_usuarios'
});

connect.connect((err)=>{
    if(err){
        console.error("Error base de datos ",err)
        return;
    }
    console.log("conexion exitosa")
});

connect.query('SELECT * FROM usuarios',(err, rows)=>{
    if(err) throw err
    console.log("Los datos de la tabla son: ")
    console.log(rows)
})

connect.end();