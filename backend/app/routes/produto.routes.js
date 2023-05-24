module.exports = app => {
    const produtoController = require("../controllers/produto.controller");

    //rota para criar um novo registro produto
    app.post("/produtos", produtoController.create);
    
    //buscar todos os registros de produtos
    app.get("/produtos", produtoController.findAll);

    //buscar apenas um registro de proguto
    app.get ("/produtos/:produtoId", produtoController.findById);

    //alterar um registro de produto
    app.put("/produtos/:produtoId", produtoController.update);

    //excluir um registro de produto
    app.delete("/produtos/:produtoId", produtoController.delete);

    //excluir todos os registros de produto
    app.delete("/produtos", produtoController.deleteAll);
}