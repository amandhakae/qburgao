module.exports = app => {
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");
    //rota para criar um novo registro produto
    app.post("/produtos",[authJwt.verifyToken, authJwt.isAdmin], produtoController.create);
    
    //buscar todos os registros de produtos
    app.get("/produtos", produtoController.findAll);

    //buscar apenas um registro de proguto
    app.get ("/produtos/:produtoId", produtoController.findById);

    //alterar um registro de produto
    app.put("/produtos/:produtoId",[authJwt.verifyToken], produtoController.update);

    //excluir um registro de produto
    app.delete("/produtos/:produtoId",[authJwt.verifyToken], produtoController.delete);

    //excluir todos os registros de produto
    app.delete("/produtos",[authJwt.verifyToken], produtoController.deleteAll);
}