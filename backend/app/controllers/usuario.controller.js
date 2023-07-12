const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuario.model.js");

const config = require("../configs/auth.config.js");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
    console.log(req.body.senha);
    if (!req.body.email || !req.body.senha || !req.body.tipo) {
        res.status(400).send({
            message: "E-mail, senha ou tipo não enviados."
        })
    } else {
        const usuario = new usuarioModel({
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 8),
            tipo: req.body.tipo
        })

        usuarioModel.create(usuario, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu algum erro."
                })
            } else {
                res.send(data);
            }
        })
    }
}

exports.signIn = (req, res) => {
    usuarioModel.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err == "not_found") {
                res.status(404).send({
                    message: "Não foi encontrado usuario com o email digitado."
                })
            } else {
                console.log(err);
                res.status(500).send({
                    message: "ocorreu um erro ao buscar email do usuario no sistema."
                })
            }
        } else {
            let validPassword = bcrypt.compareSync(req.body.senha, data.senha);
            if (!validPassword) {
                res.status(401).send({
                    accesstoken: null,
                    message: "Senha invalida!"
                })
            } else {
                let token = jwt.sign({ id: data.idusuarios }, config.secret, {
                    expiresIn: 86400 //24horas
                });

                res.status(200).send({
                    acessToken: token,
                    id: data.idusuarios,
                    email: data.email,
                    tipo: data.tipo
                })
            }
        }
    })
}
exports.findAll = (req, res) => {
    usuarioModel.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Ocorreu algum erro desconhecido"
            });
        }else{
            res.send(data);
        }
    });
}

exports.update = (req, res) => {
    if(!req.body.email || !req.body.senha ||! req.body.tipo ){
        res.status(400).send({
            message: "Conteúdo do corpo de requisição vazia."
        });
    }else{
        const usuario = new usuarioModel({
            email: req.body.email,
            senha: bcrypt.hashSync (req.body.senha, 8),
            tipo: req.body.tipo,

        });
    usuarioModel.updateById(req.params.idUsuario, usuario, (err, data) => {
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
    usuarioModel.remove(req.params.idUsuario, (err, data) =>{
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