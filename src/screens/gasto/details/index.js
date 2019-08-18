import React, { Component } from 'react';
import { get, assign } from 'lodash'
import { Card } from 'react-bootstrap';
import alertify from 'alertifyjs'
import { GoBack, GastoForm } from '../../../components'
import { gastosServices, commons } from '../../../services'
import './index.css'

class GastoDetailsScreen extends Component {

  constructor(props) {
    super(props)
    const { match } = props
    this.state = {
      id: get(match, 'params.id'),
      gasto: {}
    }
  }

  statusCode = assign({
    '200': (data) => this.onLoadSuccess(data),
    base: (data) => this.onFailure(data)
  }, commons.UknownAlertObject)

  handleRequest = (status, data) => {
    return (this.statusCode[status] || this.statusCode.base)(data)
  }

  onLoadSuccess = (data) => {
    this.setState({ gasto: data })
  }

  onFailure = (mensaje) => {
    alertify.notify(`${mensaje}`, 'error', 3);
  }

  componentWillMount() {
    const { id } = this.state
    gastosServices.get(id).then(response => {
      this.handleRequest(response.status, response.data)
    })
  }

  render() {
    const { gasto } = this.state
    return (
      <div className="gasto-details-container">
        <Card>
          <Card.Body>
            <div id="flex-container">
              <div className="flex-item-header">
                <Card.Title> <GoBack /> Detalles Gasto <hr /> </Card.Title>
              </div>
              <div className="flex-item-body">
                <GastoForm data={gasto} disabled={true} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default GastoDetailsScreen