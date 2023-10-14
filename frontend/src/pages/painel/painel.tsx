import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function App() {

  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Use useEffect para fazer a solicitação HTTP quando o componente for montado
    axios
      .get(`http://localhost:5000/painel/`)
      .then((response) => {
        setId(response.data.id)
        setNome(response.data.nome)
        setEmail(response.data.email)
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
  }, [id, nome, email]); // Adicione id como dependência para reagir a mudanças no valor de id

  const logout = () => {
    axios.get('http://localhost:5000/logout')
      .then((response) => {
        console.log(response);
        alert(response.data.message)
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  
    console.log("logout");
  };

  return (
    <>
      <h1>Olá</h1>
      <p>id: {id}</p>
      <p>nome: {nome}</p>
      <p>email: {email}</p>
      <button onClick={logout}>Sair</button>
    </>
  );
}

export default App;
