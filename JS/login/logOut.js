//Selectores

const btnLogOut = document.getElementById("btnLogOut");


//Eventos

btnLogOut.addEventListener("click", ()=>{
    localStorage.removeItem("isAuthenticated")
    window.location.href = "index.html"
})