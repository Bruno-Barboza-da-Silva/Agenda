import { Link } from "react-router-dom";


function Home() {
  return (
    <div>
      <Link to="/entrar">Entrar</Link>
      <Link to="/cadastro">Cadastrar</Link>
      <p>Bem vindo a home</p>
    </div>
  );
}

export default Home;