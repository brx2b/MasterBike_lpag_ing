let user1="brx2b";
let pass1="123";
function iniciar(){
    try {
        if(document.getElementById("nicknameU").value===user1 && document.getElementById("contraU").value===pass1){
            console.log("Datos correctos")
            document.getElementById("errorS").innerHTML='<p style="color: green;">DATOS CORRECTOS</p>';
        }else if(document.getElementById("nicknameU").value.trim()==="" || document.getElementById("contraU").value.trim()===""){
            console.log("Completa los campos")
            document.getElementById("errorS").innerHTML='<p style="color: red;">COMPLETA AMBOS CAMPOS</p>';
        }
        else{
            console.log("Datos incorrectos ingresados")
            document.getElementById("errorS").innerHTML='<p style="color: red;">DATOS INCORRECTOS</p>';
        }
    } catch (error) {
        console.log("Se ha producido un error")
    }
};
