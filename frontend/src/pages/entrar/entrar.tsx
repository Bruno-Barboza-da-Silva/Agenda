import { useState } from 'react'
import axios from 'axios'

function App() {
  

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
      await axios.post('http://localhost:5000/entrar', {
        email: email,
        senha: senha
      });

      // Redireciona para a página inicial após o cadastro bem-sucedido
      window.location.href = "/";
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      if(error.response.data.message === "E-mail já cadastrado"){
        console.log(error.response.data.message)
          return alert('Erro: E-mail já cadastrado');
      }
      if (error.response.status === 400 && error.response.data.message !== "E-mail já cadastrado") {    
        // Erro de validação ou condição ruim (BadRequest)
        return alert('Erro: Parâmetros inválidos');
      } else {
        // Outros erros de rede ou servidor
        console.error('Erro na solicitação POST:', error);
        alert('Erro desconhecido');
      }
    }
  };






  return (
    <>
      <form onSubmit={post}>
        <h1>Entrar</h1>
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
