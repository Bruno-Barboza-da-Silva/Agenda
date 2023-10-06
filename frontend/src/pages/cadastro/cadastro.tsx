import { useState } from 'react'
import axios from 'axios'

function App() {
  // const navigate = useNavigate();
  
  const [nome, setName] = useState("")

  function changeName(ev: React.ChangeEvent<HTMLInputElement>) {
    setName(ev.target.value);
  }

  const [email, setEmail] = useState("")
  
  function changeEmail(ev: React.ChangeEvent<HTMLInputElement>) {
    setEmail(ev.target.value)
  }
  
  const [senha, setSenha] = useState("")
  
  function changeSenha(ev: React.ChangeEvent<HTMLInputElement>) {
    setSenha(ev.target.value)
  }



  const post = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o envio automático do formulário
    try {
      await axios.post('http://localhost:5000/cadastro', {
        nome: nome,
        email: email,
        senha: senha
      });
      window.location.href = "/";
    } catch (error) {
      console.error('Erro na solicitação POST:', error);
    }
  };

  return (
    <>
      <form onSubmit={post}>
        <h1>Cadastro</h1>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="name" placeholder="insira seu nome" name="nome" value={nome} onChange={(ev) => changeName(ev)}/>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" placeholder="insira seu e-mail" name="email" value={email} onChange={(ev) => changeEmail(ev)}/>
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" placeholder="insira sua senha" name="password" value={senha} onChange={(ev) => changeSenha(ev)}/>
        <button type='submit'>Enviar</button>
      </form>
    </>
  );
}

export default App
