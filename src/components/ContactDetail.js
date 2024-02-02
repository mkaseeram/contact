import React, { useState } from 'react'
import image from "../images/image.jpg";
import { Link, useParams } from 'react-router-dom';


export default function ContactDetail(props) {

  //to find the from Link
  const { id } = useParams()

  //searches id from the Link in all contacts and gets that obj 
  const contactObj = props.contacts.find(obj => obj.id === id)

  return (
    <div className='main'>
      <div className='ui card centered'>
        <div className='image'>
          <img src={image} alt='image' />
        </div>
        <div className='content'>
          <div className='header'>{contactObj.name}</div>
          <div className='description'>{contactObj.email}</div>
        </div>
      </div>
      <div className='ui centered grid' style={{ marginTop: '20px' }}>

        <Link to="/">
          <button className='ui button blue center'>Back to Contact List</button>
        </Link>

      </div>
    </div>

  );
}
