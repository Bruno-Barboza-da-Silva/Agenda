import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Entrar from "./pages/entrar/entrar";
import Cadastro from "./pages/cadastro/cadastro";
import Error from "./pages/error/error"
import Painel from "./pages/painel/painel"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/painel" element={<Painel />}/>
      <Route path="*" element={<Error />} />

    </Routes>
  );
}