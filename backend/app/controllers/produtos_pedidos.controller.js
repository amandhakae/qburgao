const produtos_pedidosModel = require("../models/produtos_pedidos.model");

exports.create = (req, res) => {
    if(!req.body.observacao || !req.body.produtos_idprodutos || !req.body.pedidos_idpedidos){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia"
        });
    }else {
        const produtos_pedidos = new produtos_pedidosModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,
        });

        produtos_pedidosModel.create(produtos_pedidos, (err, data) =>{
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
    produtos_pedidosModel.getAll((err, data) => {
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


    produtos_pedidosModel.findById(req.params.produtos_pedidosId, (err,data) => {
            if (err){
                if(err.type == "not_found"){
                    res.status(404).send({
                        message: "Produto não encontrado. ID: "+req.params.produtos_pedidosId
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao retornar o produto com ID: "+req.prams.produtos_pedidosId
                    });
                }
            } else {
                res.send(data);
            }
        })
    }

exports.update = (req, res) => {
    if(!req.body.observacao || !req.body.produtos_idprodutos ||! req.body.pedidos_idpedidos ){
        res.status(400).send({
            message: "Conteúdo do corpo de requisição vazia."
        });
    }else{
        const produtos_pedidos = new produtos_pedidosModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,

        });
    

        produtos_pedidosModel.updateById(req.params.produtos_pedidosId, produtos_pedidos, (err, data) => {
            if(err){
                if(err.type == "not_found") {
                    res.status(404).send({
                        message: "Produto não encontrado."
                    })
                }else{
                    res.status(500).send({
                        message: "Erro ao atualizar produto."
                    })
                }
                }else{
                    res.send(data);
        
            }
        });
    }
}
exports.delete = (req, res) => {
    produtos_pedidosModel.remove(req.params.produtos_pedidosId, (err, data) =>{
        if(err){
            if(err.type == "not_found"){
                res.status(404).send({message:"Produto não encontrado."})
            }else{
                res.status(500).send({message:" Erro ao deletar produto."})
            }
        }else {
            res.send({message:"Produto deletado com sucesso."});
        }
    })
}
exports.deleteAll = (req,res) => {
    produtos_pedidosModel.removeAll((err, data) =>{
        if (err){
            res.status(500).send({message: "Erro ao deletar produto."})
        }else{
            res.send({message: "Todos os produtos foram deletados com sucesso."})
        }
    })
}


