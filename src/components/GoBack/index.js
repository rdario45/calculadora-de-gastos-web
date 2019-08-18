import React from 'react';
import { Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from 'react-router-dom'
import './index.css'


const GoBack = () => (
  <Link to={'/'}>
    <Button variant="light">
      <IconContext.Provider value={{ color: "blue", className: "global-class-name", size: '2em' }}>
        <MdKeyboardArrowLeft />
      </IconContext.Provider>
    </Button>
  </Link>
);

export default GoBack
