module.exports = app => {
    const produtos_pedidosController = require("../controllers/produtos_pedidos.controller");

    //rota para criar um novo registro produto
    app.post("/produtos_pedidos", produtos_pedidosController.create);
    
    //buscar todos os registros de produto_pedido
    app.get("/produtos_pedidos", produtos_pedidosController.findAll);

    //buscar apenas um registro de proguto
    app.get ("/produtos_pedidos/:produtos_pedidosId", produtos_pedidosController.findById);

    //alterar um registro de produto
    app.put("/produtos_pedidos/:produtos_pedidosId", produtos_pedidosController.update);

    //excluir um registro de produto
    app.delete("/produtos_pedidos/:produtos_pedidosId", produtos_pedidosController.delete);

    //excluir todos os registros de produto
    app.delete("/produtos_pedidos", produtos_pedidosController.deleteAll);
}