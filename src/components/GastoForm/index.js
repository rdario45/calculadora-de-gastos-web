import React, { Component } from 'react';
import { get, isEmpty, forEach, concat, assign, find } from 'lodash'
import { Container, Row, Col, Form } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import './index.css'

const numeral = require('numeral');

class GastoForm extends Component {

  constructor(props) {
    super(props)
    const defaultData = get(props, 'defaultData', {})
    this.state = {
      id: defaultData.id || null,
      titulo: defaultData.titulo || '',
      tipo: defaultData.tipo || 'COMPRA',
      descripcion: defaultData.descripcion || '',
      valor: defaultData.valor || '',
      fecha: moment(defaultData.fecha) || moment(),
      errors: {}
    }
  }

  fields = {
    titulo: () => ({
      required: true,
      maxLength: 50,
    }),
    tipo: () => ({
      required: true
    }),
    descripcion: () => ({
      maxLength: 100,
    }),
    valor: () => ({
      required: true,
      noCero: true
    }),
    fecha: () => ({
      required: true
    }),
  }

  validations = {
    required: (attrib) => attrib.length === 0 ? ['This field is required.'] : [],
    maxLength: (attrib, value) => attrib.length > value ? [`Max length ${value}`] : [],
    noCero: (attrib) => numeral(attrib).value() <= 0 ? ['This field is required.'] : []
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.trySubmit && this.props.trySubmit) {
      this.handleSubmit()
    }
  }

  static getDerivedStateFromProps(props) {
    const gasto = get(props, 'data')
    if (!isEmpty(gasto)) {
      return {
        id: gasto.id,
        titulo: gasto.titulo,
        tipo: gasto.tipo,
        descripcion: gasto.descripcion,
        valor: gasto.valor,
        fecha: moment(gasto.fecha)
      }
    }
    return null
  }

  handleSubmit = () => {
    const errorsForm = this.validateForm()
    if (find(errorsForm, (obj) => !isEmpty(obj))) {
      this.setState({ errors: errorsForm })
    } else {
      const { id, titulo, tipo, descripcion, valor, fecha } = this.state;
      const gasto = {
        id,
        titulo,
        tipo,
        descripcion,
        valor,
        fecha: fecha.format()
      }
      this.props.send(gasto)
    }
  };

  validateForm = () => {
    let errors = {} // TODO be more functional here.
    forEach(this.fields, (value, key) => {
      errors = assign(errors, { [key]: this.validate(key) })
    });
    return errors
  }

  validate = (fieldName) => {
    const field = this.fields[fieldName]();
    let errors = [] // TODO be more functional here.
    forEach(field, (value, key) => {
      const attrib = this.state[fieldName]
      errors = concat(errors, this.validations[key](attrib, value))
    });
    return errors
  }

  handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'valor') {
      /* update field value */
      this.setState({ [name]: numeral(value).format('$0,0') },
        () => {
          /* update field errors */
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: this.validate(name)
            }
          })
        })
    } else {
      /* update field value */
      this.setState({ [name]: value },
        () => {
          /* update field errors */
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: this.validate(name)
            }
          })
        })
    }
  }

  render() {
    const { disabled } = this.props
    const { titulo, tipo, descripcion, valor, fecha, errors } = this.state;
    return (
      <Form ref={el => this.form = el} >
        <Container>
          <Row>
            <Col xs={7}>
              <Form.Group>
                <Form.Control
                  className={[!isEmpty(errors.titulo) && 'border-error']}
                  name='titulo'
                  type="text"
                  placeholder="titulo"
                  value={titulo}
                  onChange={this.handleChange}
                  disabled={disabled}
                />
                {errors.titulo && errors.titulo.map((val, key) =>
                  <span key={key} className="error">{`* ${val}`}</span>
                )}
              </Form.Group>
            </Col>
            <Col xs={5}>
              <Form.Group>
                <Form.Control
                  className={[!isEmpty(errors.tipo) && 'border-error']}
                  name="tipo"
                  as="select"
                  value={tipo}
                  onChange={this.handleChange}
                  disabled={disabled}
                >
                  <option value="COMPRA">COMPRA</option>
                  <option value="RETIRO">RETIRO</option>
                  <option value="SERVICIOS">SERVICIOS</option>
                  <option value="OTROS">CONGRESO</option>
                </Form.Control>
                {errors.tipo && errors.tipo.map((val, key) =>
                  <span key={key} className="error">{`* ${val}`}</span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group>
                <Form.Control
                  className={[!isEmpty(errors.descripcion) && 'border-error']}
                  name='descripcion'
                  type="text"
                  placeholder="descripcion (opcional)"
                  value={descripcion}
                  onChange={this.handleChange}
                  disabled={disabled}
                />
                {errors.descripcion && errors.descripcion.map((val, key) =>
                  <span key={key} className="error">{`* ${val}`}</span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group>
                <Datetime
                  className={[!isEmpty(errors.fecha) && 'border-error']}
                  defaultValue={fecha}
                  inputProps={{ disabled }}
                  dateFormat={"YYYY-MM-DD"}
                  timeFormat={false}
                />
                {errors.fecha && errors.fecha.map((val, key) =>
                  <span key={key} className="error">{`* ${val}`}</span>
                )}
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Control
                  className={[!isEmpty(errors.valor) && 'border-error']}
                  name='valor'
                  type="text"
                  placeholder="$10.000"
                  value={valor}
                  onChange={this.handleChange}
                  disabled={disabled}
                />
                {errors.valor && errors.valor.map((val, key) =>
                  <span key={key} className="error">{`* ${val}`}</span>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Container>
        {/* <span> <pre> {JSON.stringify(this.state)} </pre> </span> */}
      </Form>
    )
  }
}


export default GastoForm