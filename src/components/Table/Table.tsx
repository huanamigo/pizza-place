import React from 'react';
import styles from './Table.module.scss';

interface IProps {
  order: {
    id: number;
    restaurant: string;
    product: string;
    cost: number;
  }[];
  orderCost: number;
  handleRemoveItem: (id: number) => void;
}

const Table = ({ order, orderCost, handleRemoveItem }: IProps) => {
  return (
    <div>
      {order.length === 1 ? (
        <h1 className={styles.emptyOrder}>
          Your order is empty. <br /> Use form above to get your favorite pizza
          today!
        </h1>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Product</th>
              <th>Cost</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {order.map((item) => {
              if (item.id === 0 && item.restaurant === '') {
                return null;
              }
              return (
                <tr key={item.id}>
                  <td>{item.restaurant}</td>
                  <td>{item.product}</td>
                  <td>{item.cost.toFixed(2)}</td>
                  <td>
                    <i
                      onClick={() => handleRemoveItem(item.id)}
                      className="fa-solid fa-trash"
                    ></i>
                  </td>
                </tr>
              );
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
      )}
    </div>
  );
};

export default Table;
