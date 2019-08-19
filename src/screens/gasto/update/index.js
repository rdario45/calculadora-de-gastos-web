import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import alertify from 'alertifyjs'
import { get, assign } from 'lodash'
import { Card, ButtonToolbar, Button } from 'react-bootstrap';
import { GoBack, GastoForm } from '../../../components'
import { gastosServices, commons } from '../../../services';
import './index.css'

const numeral = require('numeral');


const ButtonSection = ({ clickHandler }) => (
  <span>
    <div className="bottom-border" />
    <ButtonToolbar className="buttons-block">
      <Button variant="outline-dark" onClick={clickHandler} > Actualizar Gasto </Button>
    </ButtonToolbar>
  </span>
);

class GastoUpdateScreen extends Component {

  constructor(props) {
    super(props)
    const params = get(props, 'location.state', {})
    this.state = {
      trySubmit: false,
      id: params.id
    }
  }

  statusCode = assign({
    '200_load': (data) => this.onLoadSuccess(data),
    '200_update': () => this.onEditSuccess(),
    base: () => this.onFailure()
  }, commons.UknownAlertObject)

  handleRequest(status, data) {
    return (this.statusCode[status] || this.statusCode.base)(data)
  }

  onLoadSuccess = (data) => {
    console.log(data)
    this.setState({ gasto: {...data, valor: numeral(data.valor).format('$0,0') }, })
  }

  onEditSuccess = () => {
    this.redirectTo('/')
    alertify.notify('Editado!', 'success', 2);
  }

  onFailure = (message) => {
    alertify.notify(`${message}`, 'error', 3);
  }

  componentWillMount() {
    const { id } = this.state
    gastosServices.get(id).then(response => {
      this.handleRequest(`${response.status}_load`, response.data)
    })
  }

  submitHandler = (gasto) => {
    gastosServices.update(gasto).then((response) => {
      this.handleRequest(`${response.status}_update`)
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
    const { gasto } = this.state
    // console.log('state', JSON.stringify(this.state))
    console.log('gasto', JSON.stringify(gasto))

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
                {gasto && <GastoForm defaultData={gasto} send={this.submitHandler} trySubmit={this.state.trySubmit} />}
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