import alertify from 'alertifyjs'

const UKNOWN = 'UKNOWN'

const UknownAlertObject = {
  [UKNOWN]: () =>  alertify.notify(`Ops something happen, try later.`, 'error', 3)
}

export default {
  UKNOWN,
  UknownAlertObject
}