import React, { useState, useEffect} from "react";
import Map from "./map.jsx";
import { Link, useParams } from "react-router-dom";
import "./newContact.css"

function NewContact(props) {

  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressFull, setAddressFull] = useState({});

  const [initialPosition, setInitialPosition] = useState({ lat: -3.130033, lng: -60.023464 });

  async function getData() {
    try {
      const response = await fetch(`http://localhost:3010/contacts/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar dados do contato');
      }
      const data = await response.json();

      setName(data.name);

      setType(data.type);

      setPhone(data.number);

      setAddress(data.address);

      setInitialPosition({ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) });

    } catch (error) {
      console.error('Erro ao carregar detalhes do contato:', error);
    }
  }

  useEffect(  () => {
    if (id) {
      getData();
    }
   }, [])




//=============================form submission================================
  const save = async (e) => {
    e.preventDefault();

      const form = {
        name: name,
        type: type,
        number: phone.toString(),
        address: addressFull.address.toString(),
        latitude: addressFull.lat.toString(),
        longitude: addressFull.lng.toString(),
      }

      console.log(addressFull, "oi", form)

      try {
        const response = await fetch(id ? `http://localhost:3010/contacts/${id}`:'http://localhost:3010/contacts', {
          method: id ? `PUT`: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
        })
        if (!response.ok) {
          window.alert("Erro ao salvar contato")
        }else{
          if(id){
            window.alert('Contato alterado com sucesso!')
          }else{
            window.alert('Contato salvo com sucesso!')
          }
          window.location.href = 'http://localhost:3000/'

        }
      }catch(error) {
        console.error(error)
      }

  };

  return (
    <div className="new-contact">
      <form className="form" method="GET">
        <label htmlFor="name">Nome</label>
        <input className="form-input" type="text" name="name" id="nameInput" value={name} maxLength={35} onChange={(e)=> setName(e.target.value) } />
        <label htmlFor="type">Tipo</label>
        <input className="form-input" type="text" name="type" id="typeInput" value={type} onChange={(e)=> setType(e.target.value)} />
        <label htmlFor="phone" >Número</label>
        <input className="form-input" type="number" name="phone" id="phone" value={phone} maxLength={14} onChange={(e)=> setPhone(e.target.value)} />
        <label htmlFor="address">Endereço</label>
        <input className="form-input" id="addressInput" type="text" value={id ? address: addressFull.address} name="address" placeholder="Selecione movendo o marcador no mapa" onChange={(e)=> setAddress(e.target.value)} disabled />
        <div className="controls-create">
          <Link to={`/`}><button className="return"><i className="fa-solid fa-arrow-left"></i></button></Link>
          <button className="save" type="submit" onClick={save}><i className="fa-solid fa-cloud"></i></button>
        </div>
      </form>
      <div className="maps">
        <Map onAddress={setAddressFull} initialPosition={initialPosition} setInitialPosition={setInitialPosition}/>
      </div>
    </div>
  );
}

export default NewContact;
