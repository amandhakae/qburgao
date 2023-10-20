import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";

const ProdutoPedido = () => {
    const { id } = useParams();

    const [observacao, setObservacao] = useState("");
    const [produtos_idprodutos, setprodutos_idprodutos] = useState("");
    const [pedidos_idpedidos, setpedidos_idpedidos] = useState("");

    const [produtos, setTableProdutos] = useState([]);
    const [pedidos, setTablePedidos] = useState([]);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    
    useEffect(() => {
        async function getSelect(){
            try{
                let response = await api.get('/produtos');
                setTableProdutos(response.data);

                 response = await api.get('/pedidos');
                setTablePedidos(response.data);
                }catch(err){

                }
        }
        getSelect();

        if (!id) return;

        async function getData(){
            try{
                const {data} = await api.get (`/produtos_pedidos/${id}`);
                setprodutos_idprodutos(data.produtos_idprodutos);
                setprodutos_idprodutos(data.pedidos_idpedidos);
                setObservacao(data.observacao);
            }catch(err){
                setError("Houve um problema ao carregar os dados do produtopedido")
            }
        }
        getData();
    },[id]);
    
    const handle = async e => {
        e.preventDefault();
        
        if (!observacao || !produtos_idprodutos|| !pedidos_idpedidos){
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                if(!id){
                    await api.post("/produtos_pedidos", {observacao, produtos_idprodutos,pedidos_idpedidos});
                }else{
                    console.log(id);
                    await api.put(`/produtos_pedidos/${id}`, {observacao, produtos_idprodutos, pedidos_idpedidos});
                }
                
                navigate("/produtospedidos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar produtopedidos.")
            }
        }
    }

return (
    <div>
        <Navbar />
        <Container>
            <Form onSubmit={handle}>
                {error && <p>{error}</p>}
                <img src={Logo} alt="logo_senac"/>
                <input
                value={observacao}
                    type="text"
                    placeholder="observacao"
                    onChange={e => setObservacao(e.target.value)}
                />    
                <select onChange={e => setprodutos_idprodutos(e.target.value)} value={produtos_idprodutos}>
                <option value="">Selecione um produto</option>
                {produtos.map(produtos => (
                    <option key={produtos.idprodutos} value={produtos.idprodutos}>
                        {produtos.idprodutos}
                    </option>
                ))}
               </select>
               <select onChange={e => setpedidos_idpedidos(e.target.value)} value={pedidos_idpedidos}>
                <option value="">Selecione um pedido</option>
                {pedidos.map(pedido => (
                    <option key={pedido.idpedidos} value={pedido.idpedidos}>
                        {pedido.idpedidos}
                    </option>
                ))}
               </select>
                <button type="submit">Cadastro de ProdutosPedidos</button>
            </Form>
        </Container>
    </div>    
)
}

export default ProdutoPedido;