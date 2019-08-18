import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MdSearch, MdDelete, MdModeEdit } from "react-icons/md";
import './index.css'

const GastoListItem = ({ gasto, onRemove, onUpdate }) => {
  const { id, titulo, tipo, valor } = gasto
  return (
    <Container className="bottom-border">
      <Row>
        <Col xs={9}>{titulo}</Col>
        <Col xs={3}><span className={'gasto-valor'}>{`$${valor}`}</span></Col>
      </Row>
      <Row>
        <Col xs={9}><span className={'gasto-tipo'}>{tipo}</span></Col>
        <Col xs={1}>
          <Link to={`/details/${id}`}>
            <Button size="sm" variant="link"><MdSearch /></Button>
          </Link>
        </Col>
        <Col xs={1}>
          <Button
            size="sm"
            variant="link"
            onClick={() => onUpdate(gasto)} >
            <MdModeEdit />
          </Button>
        </Col>
        <Col xs={1}>
          <Button
            size="sm"
            variant="link"
            onClick={() => onRemove(id)} >
            <MdDelete />
          </Button>
        </Col>
      </Row>
    </Container>
  )
}


export default GastoListItem