import { get, assign } from 'lodash'
import axios from 'axios'
import moment from 'moment'
import { commons } from '../'

const numeral = require('numeral');

class GastosService {

  async get(id) {
    try {
      const url = `${global.gConfig.api_url}/gastos/${id}`
      const { status, data } = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(`GET ${url} status`, status)
      return { status, data }
    } catch (error) {
      const statusError = get(error, 'status', commons.UKNOWN)
      return { status: statusError, data: error.message }
    }
  }

  async getAll() {
    try {
      const url = `${global.gConfig.api_url}/gastos`;
      const { status, data } = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(`GET ${url} status`, status)
      return { status, data: this.transfom(data) }
    } catch (error) {
      const statusError = get(error, 'status', commons.UKNOWN)
      return { status: statusError, data: error.message }
    }
  }

  async save(gasto) {
    try {
      const url = `${global.gConfig.api_url}/gastos`;
      const body = assign(gasto, {valor: numeral(gasto.valor).value() })
      const { status, data } = await axios.post(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      console.log(`POST ${url} status`, status)
      return { status, data }
    } catch (error) {
      const statusError = get(error, 'status', commons.UKNOWN)
      return { status: statusError, data: error.message }
    }
  }

  async delete(id) {
    try {
      const url = `${global.gConfig.api_url}/gastos/${id}`
      const { status, data } = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(`DELETE ${url} status`, status)
      return { status, data }
    } catch (error) {
      const statusError = get(error, 'status', commons.UKNOWN)
      return { status: statusError, data: error.message }
    }
  }

  async update(gasto) {
    try {
      const url = `${global.gConfig.api_url}/gastos`
      const body = assign(gasto, {valor: numeral(gasto.valor).value() })
      const { status, data } = await axios.patch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      console.log(`PATH ${url} status`, status)
      return { status, data }
    } catch (error) {
      const statusError = get(error, 'status', commons.UKNOWN)
      return { status: statusError, data: error.message }
    }
  }

  transfom = (data) => {
    return data.map(gasto => {
      return ({
        ...gasto,
        fecha: moment(gasto.fecha).format('YYYY-MM-DD'),
        valor: numeral(gasto.valor).format('$0,0')
      })
    })
  }

}

export default new GastosService()