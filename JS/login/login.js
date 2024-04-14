//Selectores

const formLogin = document.getElementById("formLogin");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");

const URL = "http://localhost:3000/users";

//Eventos

formLogin.addEventListener("submit", (event)=>{
    event.preventDefault()

    login()
})




//Funciones

async function login(){

    const response = await fetch(`${URL}?email=${userEmail.value}`);
    const data = await response.json()
    console.log(data);

    if (!data.length){
        console.log("Email no registrado");
        return
    }

    if (data[0].password == userPassword.value){
        //Autenticar
        localStorage.setItem("isAuthenticated", "true");
        //Windows es un objeto global que nos permite
        window.location.href= "administrator.html"


    }else{
        console.log("Contraseña incorrecta");
    }

}