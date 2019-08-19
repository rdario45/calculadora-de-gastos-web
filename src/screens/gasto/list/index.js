import React, { Component } from 'react';
import { Card, ButtonToolbar, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import alertify from 'alertifyjs'
import { assign, isEmpty } from 'lodash'
import { GastoList } from '../../../components'
import { gastosServices, commons } from '../../../services'
import './index.css'

const ButtonSection = () => (
  <ButtonToolbar className="buttons-block">
    <Link to={'/add'}><Button variant="outline-dark"> Crear Gasto </Button></Link>
  </ButtonToolbar>
);

const TotalSection = (total) => (
  <div>
    <Container className="top-padding bottom-border">
      <Row>
        <Col xs={8}> <div className="float-right"> <h5> TOTAL </h5> </div> </Col>
        <Col xs={4} className="valor-gasto"> {`$1.407.000`} </Col>
      </Row>
    </Container>
  </div>
)

class GastoListScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gastos: [],
      total: 0
    }
  }

  statusCode = assign({
    '200_load': (data) => this.onLoadSuccess(data),
    '200_delete': (data) => this.onDeleteSuccess(data),
    base: (data) => this.onFailure(data)
  }, commons.UknownAlertObject)

  handleRequest = (status, data) => {
    return (this.statusCode[status] || this.statusCode.base)(data)
  }

  onLoadSuccess = (data) => {
    this.setState({ gastos: data })
  }

  onDeleteSuccess = (data) => {
    alertify.notify('Eliminado!', 'success', 2);
    gastosServices.getAll().then((response) => {
      this.handleRequest(`${response.status}_load`, response.data)
    })
  }

  onFailure = (mensaje) => {
    alertify.notify(`${mensaje}`, 'error', 3);
  }

  async componentWillMount() {
    gastosServices.getAll().then((response) => {
      this.handleRequest(`${response.status}_load`, response.data)
    })
  }

  onRemove = (id) => {
    gastosServices.delete(id).then((response) => {
      this.handleRequest(`${response.status}_delete`, response.data)
    })
  }

  onUpdate = (id) => {
    this.redirectTo('/edit', { id })
  }

  // TODO make a service
  redirectTo = (url, data) => {
    this.setState({ redirect: { url, data } })
  }

  renderRedirect = () => {
    const { redirect } = this.state
    if (!isEmpty(redirect)) {
      console.log('redirect', redirect)
      return <Redirect
        to={{
          pathname: redirect.url,
          state: assign(redirect.data)
        }}
      />
    }
  }

  render() {
    const { total, gastos } = this.state
    return (
      <div className="gasto-list-container">
        {this.renderRedirect()}
        <Card>
          <Card.Body>
            <div id="flex-container">
              <div className="flex-item-header">
                <Card.Title> Gastos <hr /></Card.Title>
              </div>
              <div className="flex-item-body">
                <GastoList gastos={gastos} onRemove={this.onRemove} onUpdate={this.onUpdate} />
              </div>
              <div className="flex-item-bottom">
                <TotalSection total={total} />
                <ButtonSection clickHandler={this.clickHandler} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default GastoListScreen