import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [novoEvento, setEvento] = useState('');
  const [hora, setHora] = useState('');
  const [data, setData] = useState(Date());
  const [outros, setOutros] = useState('');
  const [cor, setCor] = useState('#000000');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/painel/`)
      .then((response) => {
        setId(response.data.usuario.id);
        setNome(response.data.usuario.nome);
        setEmail(response.data.usuario.email);
        setEventos(response.data.eventos);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
  }, [id, nome, email]);

  const logout = () => {
    axios
      .get('http://localhost:5000/logout')
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });

    console.log('logout');
  };

  const changeEvento = (ev) => {
    setEvento(ev.target.value);
  };

  const changeHora = (ev) => {
    setHora(ev.target.value);
  };

  const changeData = (ev) => {
    setData(ev.target.value);
  };

  const changeOutros = (ev) => {
    setOutros(ev.target.value);
  };

  const changeCor = (ev) => {
    setCor(ev.target.value);
  };

  const getTileContent = ({ date, view }) => {
    const eventosDoDia = eventos.filter((evento) => evento.data === date.toISOString().split('T')[0]);

    if (eventosDoDia.length > 0) {
      return eventosDoDia.map((evento, index) => (
        <div key={index}>{evento.evento}</div>
      ));
    }

    return null;
  };

  const post = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/painel/evento/cadastro', {
        evento: novoEvento,
        hora,
        data,
        outros,
        cor,
        email_usuario: email,
      });
      alert('Evento cadastrado com sucesso!');
      window.location.href = `/painel/`;
    } catch (error) {
      alert('Erro ao cadastrar o evento');
    }
  };

  return (
    <>
      <h1>Olá</h1>
      <p>id: {id}</p>
      <p>nome: {nome}</p>
      <p>email: {email}</p>
      <button onClick={logout}>Sair</button>

      <Calendar onChange={setDate} value={date} tileContent={getTileContent} />


      <form onSubmit={post}>
        <label htmlFor="evento">Evento:</label>
        <input
          type="text"
          id="evento"
          name="evento"
          placeholder="Insira o nome do evento"
          value={novoEvento}
          onChange={changeEvento}
        />
        <label htmlFor="hora">Hora:</label>
        <input type="time" id="hora" name="hora" value={hora} onChange={changeHora} />
        <label htmlFor="data">Data:</label>
        <input type="date" id="data" name="data" value={data} onChange={changeData} />
        <label htmlFor="outros">Outros participantes:</label>
        <input
          type="email"
          id="outros"
          name="outros"
          value={outros}
          onChange={changeOutros}
        />
        <label htmlFor="cor">Cor do evento:</label>
        <input type="color" id="cor" name="cor" value={cor} onChange={changeCor} />
        <button type="submit">Criar evento</button>
      </form>
    </>
  );
}

export default App;
