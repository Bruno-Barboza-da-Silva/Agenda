import axios from 'axios';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

function App() {

  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(new Date());

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

// criando eventos 
const [evento, setEvento] = useState("")

  function changeEvento(ev: React.ChangeEvent<HTMLInputElement>) {
    setEvento(ev.target.value);
  }

  const [hora, setHora] = useState("")

  function changeHora(ev: React.ChangeEvent<HTMLInputElement>) {
    setHora(ev.target.value);
  }
  const [data, setData] = useState(Date())

  function changeData(ev: React.ChangeEvent<HTMLInputElement>) {
    setData(ev.target.value);
  }

  const [outros, setOutros] = useState("")

  function changeOutros(ev: React.ChangeEvent<HTMLInputElement>) {
    setOutros(ev.target.value);
  }

  const [cor, setCor] = useState("#000000")

  function changeCor(ev: React.ChangeEvent<HTMLInputElement>) {
    setCor(ev.target.value);
  }


  const post = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o envio automático do formulário
    try {
      await axios.post('http://localhost:5000/painel/evento/cadastro', {
        evento,
        hora,
        data,
        outros,
        cor,
        email_usuario: email,
      });

      alert('Evento cadastrado com sucesso!');
    } catch (error) {
        alert('Erro ao cadastrar o evento');
      }
    }


  return (
    <>
      <h1>Olá</h1>
      <p>id: {id}</p>
      <p>nome: {nome}</p>
      <p>email: {email}</p>
      <button onClick={logout}>Sair</button>
      
      <Calendar onChange={setDate} value={date} tileContent={"\n Evento"} />

<form onSubmit={post}>
  <label htmlFor="evento">Evento:</label>
  <input type="text" id='evento' name='evento' placeholder='Insira o nome do evento' value={evento} onChange={(ev) => changeEvento(ev)}/>
  <label htmlFor="hora">Hora:</label>
  <input type="time" id='hora' name='hora' value={hora} onChange={(ev) => changeHora(ev)}/>
  <label htmlFor="data">Data:</label>
  <input type="date" id='data' name='data' value={data} onChange={(ev) => changeData(ev)} />
  <label htmlFor="outros">Outros participantes:</label>
  <input type="email" id='outros' name='outros' value={outros} onChange={(ev) => changeOutros(ev)}/>
  <label htmlFor="cor">Cor do evento:</label>
  <input type="color" id="cor" name='cor' value={cor} onChange={(ev) => changeCor(ev)}/>
  <button type='submit'>Criar evento</button>
</form>

    </>
  );
}

export default App;
