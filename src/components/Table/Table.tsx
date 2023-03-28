import React, { useState } from 'react'
import styles from './Table.module.scss'

interface IProps {
  order: {
    id: number
    restaurant: string;
    product: string;
    cost: number;
  }[],
  orderCost: number,
  setOrder: React.Dispatch<React.SetStateAction<{
    id:number
    restaurant: string;
    product: string;
    cost: number;
  }[]>>
  recalculate: () => void
}

interface IItem {
  id: number;
  restaurant: string;
  product: string;
  cost: number;
}

const Table = ({order, orderCost, recalculate, setOrder}:IProps) => {

  const [value, setValue] = useState(0); // forcing re-render because react

  const handleChange = (item:IItem, event:React.ChangeEvent<HTMLInputElement>) => {
    let items = order
    for(let i = 0; i < order.length; i++) {
      if(order[i].id === item.id) {
        items[i].cost = Number(event.target.value)
      } 
    }
    setOrder(items)
    setValue(value + 1)
  }

  

  return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Product</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
       
        <tbody>
           {order.map(item => {
            if(item.id === 0 && item.restaurant === '') {
              return null
            }
            return(
              <tr key={item.id}>
                <th>{item.restaurant}</th>
                <th>{item.product}</th>
                <th><input type="number" className={styles.price} onChange={(event) => {
                  handleChange(item, event)
                  recalculate()
                }} value={item.cost.toFixed(2)}/></th>
                <th>Remove</th>
              </tr>
            )
          })}
        </tbody>

         <tfoot>
          <tr>
            <th colSpan={2}>Summary:</th>
            <th>{orderCost.toFixed(2)}</th>
            <th></th>
          </tr>
         </tfoot>
        
      </table>
  )
}

export default Table