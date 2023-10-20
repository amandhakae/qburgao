import React, {useState, useEffect} from "react";
import { useNavigate , useParams} from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Logo from "../../assets/senac.png";

const Pedidos = () => {
    const { id } = useParams();
    const [hora, setHora] = useState("");
    const [status, setStatus] = useState("");
    
    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        if (!id) return;

        async function getData(){
            try{
                const {data} = await api.get (`/pedidos/${id}`);
                setHora(data.hora);
                setStatus(data.status);
            }catch(err){
                setError("Houve um problema ao carregar os dados do pedido")
            }
        }
        getData();
    },[id]);

    const handleSignUp = async e => {
        e.preventDefault();
        if (!status || !hora){
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                if(!id){
                    await api.post("/pedidos", {hora, status});
                }else{
                    await api.put(`/pedidos/${id}`, {hora, status});
                }
                navigate("/pedidos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar pedido.")
            }
        }

    }


return (
    <div>
        <Navbar />
        <Container>
            <Form onSubmit={handleSignUp}>
                {error && <p>{error}</p>}
                <img src={Logo} alt="logo_senac"/>
                <input
                value={hora}
                    type="datetime-local"
                    placeholder="Hora"
                    onChange={e => setHora(e.target.value)}
                />    
                <input 
                value={status}
                    type="number"
                    placeholder="Status"
                    onChange={e => setStatus(e.target.value)}
                />
                <button type="submit">Cadastro de Pedidos</button>
            </Form>
        </Container>
    </div>    
)
}

export default Pedidos;