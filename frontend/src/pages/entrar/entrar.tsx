import { useState } from 'react'
import axios from 'axios'
import { AxiosError } from 'axios';

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
      const response = await axios.post('http://localhost:5000/entrar', {
        email: email,
        senha: senha
      });
  
      // Verifique se a resposta contém dados válidos
      if (response && response.data) {
        const responseData = response.data;
        
        // Agora você pode acessar os dados enviados no responseData
        const id = responseData.id;
        // const nome = responseData.nome;
        console.log(id)
        // Faça o que você desejar com os dados, como redirecionar ou exibir na interface do usuário
        window.location.href = `/painel/`; // Redireciona para a página inicial
        alert('Login efetuado com sucesso!');
      }
    } catch (error) {
      if (error instanceof AxiosError) { // Verifique o tipo usando 'instanceof' após a captura
        if (error.response && error.response.data && error.response.data.message === "E-mail ou senha incorretos") {
          console.log(error.response.data.message);
          alert('Erro: E-mail ou senha incorretos');
        } else if (error.response && error.response.status === 400 && error.response.data && error.response.data.message !== "E-mail ou senha incorretos") {
          // Erro de validação ou condição ruim (BadRequest)
          alert('Erro: Por favor, preencha seu e-mail e senha');
        } else {
          // Outros erros de rede ou servidor
          console.error('Erro na solicitação POST:', error);
          alert('Erro desconhecido');
        }
      } else {
        // Se o tipo de erro não for AxiosError
        console.error('Erro desconhecido:', error);
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
