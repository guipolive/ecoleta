import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import api from '../../services/api'; // importando o backend
import ibgeapi from '../../services/ibgeapi'; // importando a api do ibge
import { LeafletMouseEvent } from 'leaflet';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import logo from '../../assets/logo.svg';
import './styles.css';

// setando uma interface para o objeto 'Item' para podermos utilizar no frontend com typescript
interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGECityResponse {
    nome: string;
}

interface IBGEUfResponse {
    sigla: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]); // declarando o estado items
    const [ufs, setUfs] = useState<string[]>([]); // declarando o estado ufs
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0'); // declarando o estado que guarda a uf selecionada
    const [selectedCity, setSelectedCity] = useState('0'); // declarando o estado que guarda a cidade selecionada
    const [selectedItems, setSelectedItems] = useState<number[]>([]); // declarando o estado que guarda os itens selecionados
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]); // declarando o estado que guarda a lat. e long. no mapa

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]); // declarando estado que guarda a posição inicial do usuário

    const history = useHistory(); // vai ser usado para enviar o usuário de volta pra home 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setInitialPosition([latitude, longitude]);
        })
    }, [])

    // é uma função que pode ser executada várias vezes se necessário
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data); // setando os items
        })
    }, [])
    
    // é uma função que pode ser executada várias vezes se necessário
    useEffect(() => {
        ibgeapi.get<IBGEUfResponse[]>('/localidades/estados').then(response => {
            const ufList = response.data.map(uf => uf.sigla);
            
            setUfs(ufList);
        });
    }, [])
    
    // é uma função que pode ser executada várias vezes se necessário 
    useEffect(() => {
        if(selectedUf === '0'){
            return;
        };

        ibgeapi.get<IBGECityResponse[]>(`/localidades/estados/${selectedUf}/municipios`).then(response => {
            const citiesList = response.data.map(city => city.nome);

            setCities(citiesList);
        });
        
        
    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);
        setSelectedCity('0');
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city); 
    }

    function handleMapClick(event: LeafletMouseEvent) {
        const position = event.latlng;

        setSelectedPosition([position.lat, position.lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target; // pegando o nome e valor de dentro do evento ( qual foi o input e qual o valor dele)

        setFormData({ ...formData, [name]: value});
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id); // verificando se o novo item já foi selecionado
        
        // se não já foi selecionado
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id); // guarda os itens antigos retirando o item novo

            setSelectedItems(filteredItems); // atualiza o estado
        } else {
            setSelectedItems([...selectedItems, id]); // se não foi selecionado ainda, insere o item novo
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        const {name, email, whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        
        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        await api.post('points', data);

        alert('Ponto de coleta criado!');

        history.push('/'); // enviando usuário de volta pra home
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>
            
            <form onSubmit={handleSubmit}>
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" value={selectedUf} id="uf" onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option> 
                                ))}
                            </select>
                        </div>
                        
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select value={selectedCity} name="city" id="city" onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
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
                        {items.map(item => (
                            <li 
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar</button>

            </form>

        </div>
    )
}

export default CreatePoint;