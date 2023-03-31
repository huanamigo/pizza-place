import React from 'react';
import styles from './Navigation.module.scss';

interface IProps {
  resetAll: () => void;
}

const Navigation = ({ resetAll }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <i className="fa-solid fa-pizza-slice"></i>
        <span>Slice World</span>
      </div>
      <i onClick={resetAll} className="fa-solid fa-rotate-left"></i>
    </div>
  );
};

export default Navigation;
