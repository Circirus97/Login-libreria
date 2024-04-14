//Selectores y variables globales

const form = document.getElementById("formRegister");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const passwordConfirmation = document.getElementById("passwordConfirmation");
const URL = "http://localhost:3000/users"


//Eventos

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    createUser()
})



//Funciones


async function createUser(){
    //Validar la informacion

    if (!validatePassword()){
        showAlert("Contraseña no valida")
        return
    }
    
    //Validar que el email no este registrado

    if (await validateEmail()){
        showAlert("El email ya se encuentra registrado.")
        return
    }
    console.log("Pasaste las validaciones");

    try {
        //Crear al usuario
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: userEmail.value, password: userPassword.value})
        })
        
    } catch (error) {
        showAlert("Ocurrio un error al crear el usuario.")
        
    }

}


function validatePassword(){

    //Validar que las dos contraseñas sean iguales,
    //Tengan una minima longitud de 8 caracteres y 15 maximo 
    //Al menos una letra mayúscula
    //Al menos una letra minucula
    //Al menos un dígito
    //No espacios en blanco
    //Al menos 1 caracter especial

    const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    
    return userPassword.value === passwordConfirmation.value && regexp_password.test(userPassword.value);
}


function showAlert(msg){
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        showConfirmButton: false,
        timer: 4000,
        toast: "true",
        position: "top"
      })
}

async function validateEmail(){

    try {
        //
        const response = await fetch (`${URL}?email=${userEmail.value}`);

        const data = await response.json()
        
        //Si data tiene elementos quiere decir que el email esta registrado
        return data.length

    } catch (error) {
        return true
    }
    
 
}

