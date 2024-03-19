import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./pages/Landing";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import AdicionarProduto from "./pages/AdicionarProduto";
import Cardapio from "./pages/Cardapio";
import Funcionario from "./pages/Funcionario";
import CardapioF from "./pages/CardapioF";
import CadastrarCliente from "./pages/CadastrarCliente";
import Pedidos from "./pages/Pedidos";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/cadastro" element={<Cadastro />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/inicio" element={<Inicio />}></Route>
          <Route path="/cardapio" element={<Cardapio />}></Route>
          <Route path="/adicionarProduto" element={<AdicionarProduto />}></Route>
          <Route path="/funcionario" element={<Funcionario />}></Route>
          <Route path="/cardapiof" element={<CardapioF />}></Route>
          <Route path="/cadastrarCliente" element={<CadastrarCliente />}></Route>
          <Route path="/pedidos" element={<Pedidos />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
