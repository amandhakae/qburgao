import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import api from "../../services/api";
import { ProdutosPedidosContainer } from "./style";

const ListaProdutosPedidos = () => {
    const [produtos_pedidos, setProdutopedidos ] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
          const response =  await api.get('/produtos_pedidos');
            setProdutopedidos(response.data);
        }

        getData();
    }, []);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async ( e, id, index) => {
        e.persist();
        let response = '';
        try {
            response = await api.delete(`/produtos_pedidos/${id}`);
            const novosProdutopedidos = [...produtos_pedidos];
            novosProdutopedidos.splice(index, 1);
            setProdutopedidos(novosProdutopedidos);
        } catch (err) {
            console.log(response);
            setError("Houve um problema ao excluir os dados: " +response);
        }

    };

    return (
    <div>
        <Navbar/>
    <h1>Listagem de ProdutoPedidos</h1>
    {error &&<p>{error}</p>}
    <ProdutosPedidosContainer>
        <div>
            <span>idprodutos_pedidos</span>
            <span>produtos_idprodutos</span>
            <span>pedidos_idpedidos</span>
            <span>observacao</span>
            <span>Editar</span>
            <span>Excluir</span>

        </div>

        {produtos_pedidos.map((produtos_pedidos, index) => (
            <div key={String(produtos_pedidos.idprodutos_pedidos)}>
                <span>{produtos_pedidos.produtos_idprodutos}</span>
                <span>{produtos_pedidos.pedidos_idpedidos}</span>
                <span>{produtos_pedidos.observacao}</span>
            <Link to={`/produtos_pedidos/${produtos_pedidos.idprodutos_pedidos}`}>
                    <FaEdit size={16} />
                </Link>

                <Link onClick={handleDeleteAsk} to={`/produtos_pedidos/${produtos_pedidos.idprodutos_pedidos}`}>
                <FaWindowClose size={16} />
                </Link>

                <FaExclamation
                size={16}
                display="none"
                cursor="pointer"
                onClick={(e) => handleDelete(e, produtos_pedidos.idprodutos_pedidos, index)}

                />
            </div>
        ))}
    </ProdutosPedidosContainer>
    </div>
    );
};

export default ListaProdutosPedidos;