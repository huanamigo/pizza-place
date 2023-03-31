import React from 'react';
import PizzaSelector from './components/PizzaSelector/PizzaSelector';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="pizzaBackground">
        <img src="/pizza-bg.jpg" alt="" />
      </div>
      <PizzaSelector />
    </div>
  );
}

export default App;
