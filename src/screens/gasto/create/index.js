import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import alertify from 'alertifyjs'
import { assign } from 'lodash'
import { Card, ButtonToolbar, Button } from 'react-bootstrap';
import { GoBack, GastoForm } from '../../../components'
import { gastosServices, commons } from '../../../services';
import './index.css'

const ButtonSection = ({ clickHandler }) => (
  <span>
    <div className="bottom-border" />
    <ButtonToolbar className="buttons-block">
      <Button variant="outline-primary" onClick={clickHandler} >Crear Gasto</Button>
    </ButtonToolbar>
  </span>
);

class GastoCreateScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      trySubmit: false,
    }
  }

  statusCode = assign({
    '200': () => this.onSaveSuccess(),
    base: (data) => this.onFailure()
  }, commons.UknownAlertObject)

  handleRequest(status) {
    return (this.statusCode[status] || this.statusCode.base)()
  }

  onSaveSuccess = () => {
    this.redirectTo('/')
    alertify.notify('Guardado!', 'success', 2);
  }

  onFailure = (message) => {
    alertify.notify(`${message}`, 'error', 3);
  }

  submitHandler = async (gasto) => {
    gastosServices.save(gasto).then((response) => {
      this.handleRequest(response.status)
    })
  }

  clickHandler = (event) => {
    event.preventDefault();
    this.pulseSubmit()
  }

  pulseSubmit = () => {
    this.setState({ trySubmit: true },
      () => this.setState({ trySubmit: false }));
  }

  redirectTo = (url) => {
    this.setState({ redirectTo: url })
  }

  renderRedirect = () => {
    const { redirectTo } = this.state
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
  }

  render() {
    return (
      <div className="gasto-create-container">
        {this.renderRedirect()}
        <Card>
          <Card.Body>
            <div id="flex-container">
              <div className="flex-item-header">
                <Card.Title> <GoBack /> Crear Gasto <hr /> </Card.Title>
              </div>
              <div className="flex-item-body">
                <GastoForm send={this.submitHandler} trySubmit={this.state.trySubmit} />
              </div>
              <div className="flex-item-bottom">
                <ButtonSection clickHandler={this.clickHandler} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default GastoCreateScreen