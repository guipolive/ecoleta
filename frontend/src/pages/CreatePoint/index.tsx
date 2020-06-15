import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import './styles.css';

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>
            
            <form>
                <h1>Cadastro do<br/>ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                                <option value="1">Brasília</option>
                                <option value="2">Goiânia</option>
                            </select>
                        </div>
                        
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                                <option value="1">Brasília</option>
                                <option value="2">Goiânia</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de Cozinha</span>
                        </li>
                        <li className="selected">
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de Cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de Cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de Cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de Cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Óleo"/>
                            <span>Óleo de Cozinha</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar</button>

            </form>

        </div>
    )
}

export default CreatePoint;