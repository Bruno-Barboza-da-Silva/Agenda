import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // const navigate = useNavigate();
  
  const [titulo, setName] = useState()

  function changeName(ev) {
    setName(ev.target.value)
  }

  const post = (e) => {
    console.log("ola")
    e.preventDefault(); // Evita o envio automático do formulário
    axios.post('http://localhost:5000/', {
      nome: titulo,
    })
    .then(() => {
      window.location.href = "/";
      console.log("entrou");
    })
    .catch((error) => {
      console.error('Erro na solicitação POST:', error);
    });
  };

  return (
    <>
      <form onSubmit={post}>
        <h1>Cadastro</h1>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="name" placeholder="insira seu nome" name="nome" onChange={(ev) => changeName(ev)}/>
        <button type='submit'>Enviar</button>
      </form>
    </>
  )
}

export default App
