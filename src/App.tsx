import React from 'react';
import PizzaSelector from './components/PizzaSelector/PizzaSelector';
import './App.css'
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className='container'>
      <div className='pizzaBackground'>
        <img src="/pizza-bg.jpg" alt="" />
      </div>
      <Navigation />
      <PizzaSelector />
    </div>
  );
}

export default App;
