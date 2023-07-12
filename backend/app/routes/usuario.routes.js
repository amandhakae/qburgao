module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");

    app.post("/signup", usuarioController.signUp);
    app.post("/signin", usuarioController.signIn);
    app.get("/usuario", usuarioController.findAll);
    app.put("/usuario/:idUsuario", usuarioController.update);
    app.delete("/usuario/:idUsuario", usuarioController.delete);
}
