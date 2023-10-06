import { useState } from 'react'
import axios from 'axios'

function App() {
  // const navigate = useNavigate();
  
  const [titulo, setName] = useState("")

  function changeName(ev: React.ChangeEvent<HTMLInputElement>) {
    setName(ev.target.value);
  }

  const post = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o envio automático do formulário
    try {
      await axios.post('http://localhost:5000/cadastro', {
        nome: titulo,
      });
      window.location.href = "/";
      console.log("entrou");
    } catch (error) {
      console.error('Erro na solicitação POST:', error);
    }
  };

  return (
    <>
      <form onSubmit={post}>
        <h1>Cadastro</h1>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="name"
          placeholder="insira seu nome"
          name="nome"
          value={titulo}
          onChange={(ev) => changeName(ev)}
        />
        <button type='submit'>Enviar</button>
      </form>
    </>
  );
}

export default App
