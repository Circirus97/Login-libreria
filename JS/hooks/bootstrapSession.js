(() => {
  //Logica
  //Obtenemos la sesion del usuario del localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  //Obtengo la ruta donde el usuario quiera acceder
  const path = window.location.pathname;

  //Corto el path para acceder solamente al archivo que esta intentando acceder el usuario

  const routeActu = path.substring(path.lastIndexOf("/") + 1);

  //Creo una lista con todos los nombres de los archivos que yo quiero proteger
  const privateRoutes = ["administrator.html"];

  console.log(isAuthenticated, path);
  console.log(routeActu);

  //Si la ruta actual se encuentra dentro de las privadas y el suario no esta autenticado, entonces lo redirigimos al login

  if (privateRoutes.includes(routeActu) && !isAuthenticated) {
    console.log("No tienes permisos");
    window.location.href = "index.html";
  }
})();
