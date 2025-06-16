

const usuarios = [
    {run:'18453777',nicknameV:'brx2b',pass:'123'},
    {run:'13666162',nicknameV:'satan',pass:'666'}
  ];

for (let i = 0; i < usuarios.length; i++) {
    console.log(usuarios[i].nombre)
    
}

function iniciar() {
        const nickname = document.getElementById("nicknameU").value;
        const password = document.getElementById("contraU").value;
        if(nickname.trim() === "" || password.trim() === ""){
            console.log("Completa los campos");
            document.getElementById("errorS").innerHTML = '<p style="color: red;">COMPLETA AMBOS CAMPOS</p>';
        }else{
            try{
                for (let i = 0; i < usuarios.length; i++) { //Esto recorre el array
                console.log(usuarios[i].nicknameV)
                let usuarioX=usuarios[i].nicknameV; //Busca al usuario en el array
                    if(usuarioX == nickname){
                        console.log("Se encontro usuario")
                        for (let i = 0; i < usuarios.length; i++){
                            console.log(usuarios[i].pass)
                            let passX=usuarios[i].pass; //Busca la pass en el array 
                            if (nickname === usuarioX && password === passX) {
                            console.log("Datos correctos");
                            document.getElementById("errorS").innerHTML = '<p style="color: green;">DATOS CORRECTOS</p>';
                            window.location.href = 'Inicio/inicio.html';
                        }}
                    }else {
                            console.log("Datos incorrectos ingresados");
                            document.getElementById("errorS").innerHTML = '<p style="color: red;">DATOS INCORRECTOS</p>';
                    }
                }
            }catch(err){
                console.log("Se ha producido un error ",err)
            }
            
            console.log("No se encontro user")

        }
        
        

        
}
/*
function registro(){

}
*/