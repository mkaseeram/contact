import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function EditContact(props) {

  const navigate = useNavigate();

  const { id } = useParams();
  const contactObj = props.contacts.find(obj => obj.id === id)

  const [state, setState] = useState({
    id: contactObj.id,
    name: contactObj.name,
    email: contactObj.email
  })


  const update = (eve) => {
    eve.preventDefault();
    if (state.name === "" && state.email === "") {
      alert("all the fields are mandatory");
      return;
    }
    props.updateContactHandler(state)
    navigate("/")
  };

  return (
    <div className='ui main'>
      <h2>Edit Contact</h2>
      <form className='ui form' onSubmit={update}>
        <div className='field'>
          <label>Name</label>
          <input
            type='text' name='Name' placeholder='Name'
            value={state.name}
            onChange={
              (eve) => setState({ ...state, name: eve.target.value })
            }
          />
        </div>
        <div className='field'>
          <label>Email</label>
          <input
            type='Email'
            name='name' placeholder='Email'
            value={state.email}
            onChange={
              (eve) => setState({ ...state, email: eve.target.value })
            }
          />
        </div>
        <button className='ui button blue'>Update</button>
      </form>
    </div>
  )
}
