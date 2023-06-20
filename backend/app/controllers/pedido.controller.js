const pedidoModel = require("../models/pedido.model");

exports.create = (req, res) => {
    if(!req.body.nome || ! req.body.valor){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    }else {
        const pedido = new pedidoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });

        pedidoModel.create(pedido, (err, data) =>{
            if(err){
                res.status(500).send({
                    message: err.message || "Ocorreu um erro ao inserir os dados"
                });
            }else {
                res.send(data);
            }
        })
    }
}
exports.findAll = (req, res) => {
    pedidoModel.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Ocorreu algum erro desconhecido"
            });
        }else{
            res.send(data);
        }
    });
}
exports.findById = (req, res) => {


        pedidoModel.findById(req.params.pedidoId, (err,data) => {
            if (err){
                if(err.type == "not_found"){
                    res.status(404).send({
                        message: "pedido não encontrado. ID: "+req.params.pedidoId
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao retornar o pedido com ID: "+req.prams.pedidoId
                    });
                }
            } else {
                res.send(data);
            }
        })
    }

exports.update = (req, res) => {
    if(!req.body.nome || !req.body.valor){
        res.status(400).send({
            message: "Conteúdo do corpo de requisição vazia."
        });
    }else{
        const pedido = new pedidoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });
    

        pedidoModel.updateById(req.params.pedidoId, pedido, (err, data) => {
            if(err){
                if(err.type == "not_found") {
                    res.status(404).send({
                        message: "Pedido não encontrado."
                    })
                }else{
                    res.status(500).send({
                        message: "Erro ao atualizar pedido."
                    })
                }
                }else{
                    res.send(data);
        
            }
        });
    }
}
exports.delete = (req, res) => {
    pedidoModel.remove(req.params.pedidoId, (err, data) =>{
        if(err){
            if(err.type == "not_found"){
                res.status(404).send({message:"Pedido não encontrado."})
            }else{
                res.status(500).send({message:" Erro ao deletar pedido."})
            }
        }else {
            res.send({message:"Pedido deletado com sucesso."});
        }
    })
}
exports.deleteAll = (req,res) => {
    pedidoModel.removeAll((err, data) =>{
        if (err){
            res.status(500).send({message: "Erro ao deletar pedido."})
        }else{
            res.send({message: "Todos os pedidos foram deletados com sucesso."})
        }
    })
}


