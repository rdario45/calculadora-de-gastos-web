import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import alertify from 'alertifyjs'
import { get, assign } from 'lodash'
import { Card, ButtonToolbar, Button } from 'react-bootstrap';
import { GoBack, GastoForm } from '../../../components'
import { gastosServices, commons } from '../../../services';
import './index.css'

const ButtonSection = ({ clickHandler }) => (
  <span>
    <div className="bottom-border" />
    <ButtonToolbar className="buttons-block">
      <Button variant="outline-primary" onClick={clickHandler} > Actualizar Gasto </Button>
    </ButtonToolbar>
  </span>
);

class GastoUpdateScreen extends Component {

  constructor(props) {
    super(props)
    const gasto = get(props, 'location.gasto', {})
    this.state = {
      trySubmit: false,
      gasto
    }
  }

  statusCode = assign({
    '200': () => this.onEditSuccess(),
    base: () => this.onFailure()
  }, commons.UknownAlertObject)

  handleRequest(status) {
    return (this.statusCode[status] || this.statusCode.base)()
  }

  onEditSuccess = () => {
    this.redirectTo('/')
    alertify.notify('Editado!', 'success', 2);
  }

  onFailure = (message) => {
    alertify.notify(`${message}`, 'error', 3);
  }

  submitHandler = (gasto) => {
    gastosServices.update(gasto).then((response) => {
      this.handleRequest(response.status)
    })
  }

  clickHandler = (event) => {
    event.preventDefault();
    this.pulseSubmit()
  }

  // TODO check
  pulseSubmit = () => {
    this.setState({ trySubmit: true },
      () => this.setState({ trySubmit: false }));
  }

  // TODO make a service
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
      <div className="gasto-update-container">
        {this.renderRedirect()}
        <Card>
          <Card.Body>
            <div id="flex-container">
              <div className="flex-item-header">
                <Card.Title> <GoBack /> Editar Gasto <hr /> </Card.Title>
              </div>
              <div className="flex-item-body">
                <GastoForm defaultData={this.state.gasto} send={this.submitHandler} trySubmit={this.state.trySubmit} />
              </div>
              <div className="flex-item-bottom">
                <ButtonSection clickHandler={this.clickHandler} />
              </div>
            </div>
            {/* <span> <pre> {JSON.stringify(this.state)} </pre> </span> */}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default GastoUpdateScreen