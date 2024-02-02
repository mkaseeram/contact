import React, { useRef } from 'react'
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom';

export default function ContactList(props) {
  const inputEl = useRef("");

  //deleteContactHandler
  const deleteConstantHandler = (id) => {
    props.getContactId(id);
  };

  // getSearchTerm
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  }

  //renderContactList
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteConstantHandler}
        key={contact.id} />
    );
  })
  return (
    <div className='main'>
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>

      </h2>
      <div className='ui search'>
        <div className='ui icon input'>
          <input className='prompt'
            type='text'
            placeholder='Search Contact'
            value={props.term}
            onChange={getSearchTerm}
            ref={inputEl} />
          <i className='ui search icon'></i>

        </div>
      </div>
      <div className="ui celled list ">{renderContactList.length >0? renderContactList:"No Contacts available "}</div>
    </div>
  )
}
