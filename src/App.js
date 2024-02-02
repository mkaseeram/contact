import logo from './logo.svg';
import api from './api/contacts'
// import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditContact from './components/EditContact';

function App() {


  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //retrieveContacts
  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts")
      return response.data;
    } catch (e) {
      console.error(e, "error in the retrieve contacts")
    }
  }

  //To add Contact
  const addContactHandler = async (contact) => {
    try {
      const request = {
        id: v4(),
        ...contact
      }
      const response = await api.post("/contacts", request)
      setContacts([...contacts, response.data])
    } catch (e) {
      console.error(e, "Error in the add contact handler")
    }
  };

  //To update
  const updateContactHandler = async (contact) => {

    try {
      const response = await api.put(`/contacts/${contact.id}`, contact)
      const { id, name, email } = response.data
      setContacts(contacts.map(contact => {
        return contact.id === id ? { ...response.data } : contact;
      }))

    } catch (e) {

      console.error(e, "error in the update contacts")
    }
  }

  //To delete contact
  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id
      });
      setContacts(newContactList);
    } catch (e) {
      console.error(e, "Error in the remove contact Handler");
    }
  };

  //To search
  const searchHandler = (searchTerm) => {
    try {
      console.log(searchTerm)
      setSearchTerm(searchTerm)
      if (searchTerm !== "") {

        //filer the contacts 
        const newContactList = contacts.filter((contact) => {
          return Object.values(contact)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        });
        setSearchResults(newContactList)
      } else {
        setSearchResults(contacts);
      }
    } catch (e) {
      console.error(e, "Error in the search handler");
    }
  }
  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const allContacts = await retrieveContacts();
        if (allContacts) setContacts(allContacts);
      } catch (e) {
        console.error(e, "Error in the useEffect getAllContacts")
      }
    }
    getAllContacts();

  }, []);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>

          {/* AddContact */}
          <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />} />

          {/* EditContact */}
          <Route path='/edit/:id' element={<EditContact updateContactHandler={updateContactHandler}
            contacts={contacts}
          />} />

          {/* ContactList */}
          <Route path='/' element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} tern={searchTerm}
            searchKeyword={searchHandler}
          />} />
          
          {/* ContactDetail */}
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
