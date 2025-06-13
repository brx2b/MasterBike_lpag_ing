
let user1 = "brx2b";
let pass1 = "123";

function iniciar() {
    try {
        const nickname = document.getElementById("nicknameU").value;
        const password = document.getElementById("contraU").value;

        if (nickname === user1 && password === pass1) {
            console.log("Datos correctos");
            document.getElementById("errorS").innerHTML = '<p style="color: green;">DATOS CORRECTOS</p>';
            window.alert("Sesión iniciada ¡Bienvenido!");
            window.location.href = 'Inicio/inicio.html';
        } else if (nickname.trim() === "" || password.trim() === "") {
            console.log("Completa los campos");
            document.getElementById("errorS").innerHTML = '<p style="color: red;">COMPLETA AMBOS CAMPOS</p>';
        } else {
            console.log("Datos incorrectos ingresados");
            document.getElementById("errorS").innerHTML = '<p style="color: red;">DATOS INCORRECTOS</p>';
        }
    } catch (error) {
        console.log("Se ha producido un error", error);
    }
}
