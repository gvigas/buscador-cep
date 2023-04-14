import { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import './App.css'

import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    if(input === ''){
      alert('Preencha algum Cep')
      return
    }

    try {
     const response = await api.get(`${input}/json`)
     setCep(response.data)
     setInput('')
      
    } catch (e) {
      alert(`Erro ao buscar!`)
      setInput('')
    }
  }

  return (
    <div className="Container">
      <h1>BUSCADOR DE CEP</h1>
      <div className="pesquisa">
      <input
      placeholder='Digite seu CEP' 
      type="text" 
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>
        <BiSearchAlt2 
        className='lupa'
        />
      </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <div className="main">
        <h2>CEP: {cep.cep}</h2>
        <span> <strong>Rua: </strong>{cep.logradouro}</span>
        <span><strong>Bairro: </strong> {cep.bairro}
        </span>
        <span><strong>Cidade:</strong> {cep.localidade} </span>
        <span><strong>Estado:</strong> {cep.uf}</span>
    </div>
      )}
      
     
    </div>
  )
}



export default App
