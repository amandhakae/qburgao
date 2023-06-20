module.exports = app => {
    const pedidoController = require("../controllers/pedido.controller");

    //rota para criar um novo registro pedido
    app.post("/pedidos", pedidoController.create);
    
    //buscar todos os registros de pedido
    app.get("/pedidos", pedidoController.findAll);

    //buscar apenas um registro de pedido
    app.get ("/pedidos/:pedidoId", pedidoController.findById);

    //alterar um registro de pedido
    app.put("/pedidos/:pedidoId", pedidoController.update);

    //excluir um registro de pedido
    app.delete("/pedidos/:pedidoId", pedidoController.delete);

    //excluir todos os registros de pedido
    app.delete("/pedidos", pedidoController.deleteAll);
}