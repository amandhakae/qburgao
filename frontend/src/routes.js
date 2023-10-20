import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } 
                                                       from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Usuarios from './pages/Usuarios';
import Produto from './pages/Produto';
import Produtos from './pages/Produtos';
import Pedidos from './pages/Pedidos';
import Pedido from './pages/Pedido';
import ProdutoPedido from './pages/ProdutoPedido';
import ProdutosPedidos from './pages/ProdutosPedidos';
import MainPage from "./pages/MainPage";

const LogoutPage = () => <Logout />;
const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const UsuariosPage = () => <Usuarios />
const ProdutoPage = () => <Produto />
const ProdutosPage = () => <Produtos />
const PedidoPage = () => <Pedido />
const PedidosPage = () => <Pedidos />
const ProdutoPedidoPage = () => <ProdutoPedido />
const ProdutosPedidosPage = () => <ProdutosPedidos />
const NotFoundPage = () => <h1>Page not found.</h1>
const AppPage = () => {
    if (!isAuthenticated()){
        return <Navigate to="/" replace/>
    }
    return <MainPage />;
}

const Rotas = () => (
    <Router>
        <Routes>
            <Route path='/logout' element={<LogoutPage />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/usuarios/:id' element={<SignUpPage />} />
            <Route path='/app' element={<AppPage />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/produtos' element={<ProdutosPage />} />
            <Route path='/produtos/:id' element={<ProdutoPage />} />
            <Route path='/produto' element={<ProdutoPage />} />
            <Route path='/pedidos' element={<PedidosPage />} />
            <Route path='/pedidos/:id' element={<PedidoPage />} />
            <Route path='/pedido' element={<PedidoPage />} />
            <Route path='/produtopedido' element={<ProdutoPedidoPage />} />
            <Route path='/produtos_pedidos/:id' element={<ProdutoPedidoPage />} />
            <Route path='/produtospedidos' element={<ProdutosPedidosPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </Router>    
);

export default Rotas;
