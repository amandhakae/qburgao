const sql = require("./db.js");
//construtor
const PedidoModel = function(pedido){
    this.nome = pedido.nome;
    this.valor = pedido.valor;
}

//cria novo pedido no banco
PedidoModel.create = (pedido, result) => {

    sql.query("INSERT into pedidos set ?", pedido, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        
        console.log("pedido criado: ",{idpedidos: res.insertId, ...pedido});
        result(null, {idpedidos: res.insertId, ...pedido});
    })
};

//seleciona produto por ID
PedidoModel.findById = (pedidoId, result) => {

        sql.query("Select * from pedidos where idpedidos ="+pedidoId, (err,res) => {
            if (err) {
                console.log("erro: ", err);
                result(null,err);
                return;
            }
            if (res.length) {
                console.log("Pedido Encontrado", res[0]);
                result(null,res[0]);
            } else {
                result({type: "not_found"}, null);
                console.log("Pedido não encontrado");
            }
        })
    };


//seleciona todos os produtos
PedidoModel.getAll = result =>{
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        
        console.log("pedido: ",res);
        result(null, res);
    })
};
//Atualizar produto por ID

PedidoModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos SET nome = ?, valor = ? WHERE idpedidos = ? ",
    [pedido.nome, pedido.valor, pedidoId], (err, res) => {
        if (err){
            console.log("erro: ", err);
            result(null, err);
        } else if (res.affectedRows == 0){
            result({type: "not_found"}, null);
        } else {
            console.log("Pedido atualizado: ", {idpedidos: pedidoId, ...pedido});
            result(null, {idpedidos: pedidoId, ...pedido});
        }
    });
};

//Remover pedidos por ID

PedidoModel.remove = (pedidoId, result) => {
sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId, (err, res) =>{
    if(err){
        console.log("erro: ", err);
        result(err, null);
    }else if (res.affectedRows == 0) {
        result({ type: "not_found"}, null);
    }else{
        result(null, res);
    }
});
};

//Remover todos os pedidos

PedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos ", pedidoId, (err, res) =>{
        if(err){
            console.log("erro: ", err);
            result(err, null);
        }else{
            result(null, res);
        }
    });
    };


module.exports = PedidoModel;