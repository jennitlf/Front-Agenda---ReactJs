import "./contactList.css"
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ButtonPage from './buttonPage.jsx'

const ContactList = ({searchTerm}) => {

  const [contacts, setContacts] = useState([]);

  const [filteredContacts, setFilteredContacts] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);


  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3010/contacts');
      if(!response.ok) {
        throw new Error('Erros ao carregar contatos');
      }
      const data = await response.json();
      setContacts(data)
    }catch(error){
      console.error('Erro ao buscar contatos:', error)
    }
  }

  useEffect(() =>{
    fetchContacts();
    }, []);

  useEffect( () =>
    {
      if(searchTerm.trim() === "" ) {
        setFilteredContacts(contacts)
      }else{
        const filtered = contacts.filter((contact)=> {
          return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredContacts(filtered)

      }
      setCurrentPage(1)
    }, [contacts, searchTerm]
  )


  const currentItems = filteredContacts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredContacts.length / perPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return(
      <div className="content">
        <ul id="list" >
          {currentItems.map(contact => (
            <li className="contact" key={contact.id} >
              <i className="fa-solid fa-user icon-name" ></i>
              <div className="container-name-contact">{contact.name}</div>

              <div className="container-button-contact">
              <Link to={`/details/${contact.id}`} className="route-details" >
              <button className="details">
                <i className="fa-solid fa-list-ul"></i>
              </button>
              </Link>
              </div>
            </li>
          ))}
        </ul>
        <ButtonPage currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

    )

}

export default ContactList

