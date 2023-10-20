import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { Nav, NavItems, ToggleButton } from './style';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <Nav>
      <h1>Meu App</h1>
      <ToggleButton onClick={() => setShowNav(!showNav)}><FaBars /></ToggleButton>
      <NavItems show={showNav}>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/produtos">Lista de Produtos</Link>
        <Link to="/produto">Cadastro de Produto</Link>
        <Link to="/pedidos">Lista de Pedidos</Link>
        <Link to="/pedido">Cadastro de Pedidos</Link>
        <Link to="/produtospedidos">Lista de ProdutoPedidos</Link>
        <Link to="/produtopedido">Cadastro de ProdutosPedidos</Link>
        <Link to="/logout">Logout</Link>
      </NavItems>
    </Nav>
  );
};
export default Navbar;