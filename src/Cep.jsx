import { useState } from 'react'
import api from './api'

export default function Cep() {

    const [cep, setCep] = useState('')
    const [resposta, setResposta] = useState(null)
    const el = document.querySelector('.cep-container')

    async function handleCepSearch() {
        try {
            const response = await api.get(`${cep}/json`)
            setResposta(response.data)
            el.classList.remove('collapsed')
            el.classList.add('expanded')
        }catch {
            alert("Um erro ocorreu. Tente novamente.")
        }
    }

    function clearCep() {
        setCep('')
        setResposta(null)
        el.classList.remove('expanded')
        el.classList.add('collapsed')
        
    }

    return (
        <div className="cep-container collapsed">
            <h1>Buscar CEP</h1>
            
            <div className="input">
                <input 
                    type="text" 
                    placeholder="Digite seu CEP" 
                    value={cep} 
                    onChange={(e) => setCep(e.target.value)}
                />

                <button onClick={handleCepSearch}>Buscar</button>
            </div>
            
            {resposta && 
                            <div className="data">
                                <button onClick={clearCep}>x</button>
                                <span>Cep:</span>
                                <span>{resposta.cep}</span>
                                <span>UF:</span>
                                <span>{resposta.uf}</span>
                                <span>Cidade:</span>
                                <span>{resposta.localidade}</span>
                                <span>Bairro:</span>
                                <span>{resposta.bairro}</span>
                                <span>Logradouro:</span>
                                <span>{resposta.logradouro}</span>
                            </div>
            }
        </div>
    );
}