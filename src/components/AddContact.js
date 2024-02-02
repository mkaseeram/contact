import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddContact(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: ""
  })

  const add = (eve) => {
    eve.preventDefault();
    if (state.name === "" && state.email === "") {
      alert("all the fields are mandatory");
      return;
    }
    props.addContactHandler(state)
    setState({ name: "", email: "" });
    navigate("/")
  };

  return (
    <div className='ui main'>
      <h2>Add Contact</h2>
      <form className='ui form' onSubmit={add}>
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
        <button className='ui button blue'>Add</button>
      </form>
    </div>
  )
}
