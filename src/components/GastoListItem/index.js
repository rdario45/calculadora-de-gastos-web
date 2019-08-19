import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MdSearch, MdDelete, MdModeEdit } from "react-icons/md";
import './index.css'


const GastoRows = ({ titulo, tipo, valor, fecha }) => (
  <span>
    <Row>
      <Col xs={8} className="titulo-gasto">{titulo}</Col>
      <Col xs={4} className="fecha-gasto">{fecha}</Col>
    </Row>
    <Row>
      <Col xs={8} className="tipo-gasto">{tipo}</Col>
      <Col xs={4} className="valor-gasto">{valor}</Col>
    </Row>
  </span>
)

const OpenedListItem = ({ id, titulo, tipo, valor, fecha, onRemove, onUpdate }) => (
  <Container className="top-padding bottom-border">
    <Row>
      <Col xs={12} className="gastos-options">
        <div className="float-right">
          <Link to={`/details/${id}`}>
            <Button
              size="sm"
              variant="link">
              <MdSearch />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="link"
            onClick={() => onUpdate(id)} >
            <MdModeEdit />
          </Button>
          <Button
            className="last-opt-btn"
            size="sm"
            variant="link"
            onClick={() => onRemove(id)} >
            <MdDelete />
          </Button>
        </div>
      </Col>
    </Row>
    <GastoRows titulo={titulo} tipo={tipo} valor={valor} fecha={fecha} />
  </Container>
)


const ClosedListItem = ({ titulo, tipo, valor, fecha }) => (
  <Container className="top-padding bottom-border">
    <GastoRows titulo={titulo} tipo={tipo} valor={valor} fecha={fecha} />
  </Container>
)

const GastoListItem = ({ gasto, onRemove, onUpdate }) => {
  const [isOpen, toggleOpen] = useState(false);
  return (
    <span>
      <div onClick={() => toggleOpen(!isOpen)}>
        {!isOpen ?
          <ClosedListItem {...gasto} /> :
          <OpenedListItem {...gasto} onRemove={onRemove} onUpdate={onUpdate} />
        }
      </div>
    </span>
  )
}


export default GastoListItem