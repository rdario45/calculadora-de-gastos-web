import React from 'react';
import { GastoListItem } from '../index'
import './index.css'

const GastoList = ({ gastos, onRemove, onUpdate }) => {
  return (
    <div className="gasto-list">
      {gastos.map(gasto =>
        <GastoListItem
          key={gasto.id}
          gasto={gasto}
          onRemove={onRemove}
          onUpdate={onUpdate} />
      )}
    </div>
  )
}

export default GastoList