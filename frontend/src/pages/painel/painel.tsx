import axios from 'axios'
import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'

function App () {

  const { id } = useParams();
  console.log(id)


  const [frase, setFrase] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:5000/painel/${id}`).then((res)=>{
      console.log(res)
      // setFrase(res.data[0].name)
    });
  },)



  return (
    <>
    <h1>Olá</h1>
    </>
  )
}


export default App