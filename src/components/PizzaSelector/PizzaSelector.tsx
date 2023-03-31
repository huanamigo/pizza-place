import React, { useEffect, useState } from 'react';
import MenuSelect from '../MenuSelect/MenuSelect';
import Navigation from '../Navigation/Navigation';
import Table from '../Table/Table';

const PizzaSelector = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 0,
      name: '',
      address1: '',
      address2: '',
      latitude: 0,
      longitude: 0,
    },
  ]);
  const [menu, setMenu] = useState([
    {
      id: 0,
      category: '',
      name: '',
      topping: [],
      price: 0,
      rank: 0,
    },
  ]);
  const [chosenRestaurant, chooseRestaurant] = useState({
    value: 0,
    label: 'Select restaurant...',
  });
  const [chosenPizza, choosePizza] = useState({
    id: 0,
    label: 'Select...',
    price: 0,
  });
  const [order, setOrder] = useState([
    {
      id: 0,
      restaurant: '',
      product: '',
      cost: 0,
    },
  ]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [orderCost, setOrderCost] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [cacheTime, setCacheTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const resetAll = () => {
    setOrder([
      {
        id: 0,
        restaurant: '',
        product: '',
        cost: 0,
      },
    ]);
    choosePizza({
      id: 0,
      label: 'Select...',
      price: 0,
    });
    chooseRestaurant({
      value: 0,
      label: 'Select restaurant...',
    });
    setIsDisabled(true);
    localStorage.clear();
  };

  const handleAddClick = () => {
    let rest = '';
    for (let i = 0; i < restaurants.length; i++) {
      if (chosenRestaurant.value === restaurants[i].id) {
        rest = restaurants[i].name;
      }
    }

    setOrder([
      ...order,
      {
        id: orderNumber,
        restaurant: rest,
        product: chosenPizza.label,
        cost: chosenPizza.price,
      },
    ]);
    setIsDisabled(true);
    chooseRestaurant({
      value: 0,
      label: 'Select restaurant...',
    });
    choosePizza({
      id: 0,
      label: 'Select...',
      price: 0,
    });
    setOrderNumber(orderNumber + 1);
  };

  const recalculate = () => {
    let tempCost = 0;
    setOrderCost(0);
    for (let i = 0; i < order.length; i++) {
      tempCost = tempCost + order[i].cost;
    }
    setOrderCost(tempCost);
  };

  // removing order item

  const handleRemoveItem = (id: number) => {
    let array = order;
    let filteredArray = array.filter((item) => item.id !== id);
    setOrder(filteredArray);
    console.log(order.length);

    if (order.length === 2) {
      localStorage.clear();
    }
  };

  // fetching from api

  const fetchData = async (URL: string, toFetch: string) => {
    setIsLoading(true);
    const res = await fetch(URL);
    if (!res.ok) {
      console.log(String(res.status));
    } else {
      const data = await res.json();
      if (toFetch === 'restaurant') {
        setRestaurants(data);
      } else if (toFetch === 'menu') {
        setMenu(data);
        setCacheTime(Date.now());
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    recalculate();
  });

  // saving to local storage
  useEffect(() => {
    if (order.length > 1) {
      localStorage.setItem('order', JSON.stringify(order));
      localStorage.setItem('orderNumber', JSON.stringify(orderNumber));
      // I don't think selected restaurants and pizzas should be saved too, but the pattern would be the same
    }
  }, [order, orderNumber]);

  useEffect(() => {
    if (restaurants.length > 1) {
      localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }

    if (menu.length > 1) {
      localStorage.setItem('menu', JSON.stringify(menu));
    }

    if (cacheTime !== 0) {
      localStorage.setItem('cacheTime', JSON.stringify(cacheTime));
    }
  }, [restaurants, menu, cacheTime]);

  useEffect(() => {
    if (localStorage.getItem('order') !== null) {
      const order = JSON.parse(localStorage.getItem('order') || '');
      if (order) {
        setOrder(order);
      }
    }

    if (localStorage.getItem('orderNumber') !== null) {
      const orderNumber = JSON.parse(localStorage.getItem('orderNumber') || '');
      if (orderNumber) {
        setOrderNumber(orderNumber);
      }
    }

    if (localStorage.getItem('restaurants') !== null) {
      const restaurants = JSON.parse(localStorage.getItem('restaurants') || '');
      if (restaurants) {
        setRestaurants(restaurants);
      }
    }

    if (localStorage.getItem('menu') !== null) {
      const menu = JSON.parse(localStorage.getItem('menu') || '');
      if (menu) {
        setMenu(menu);
      }
    }

    if (localStorage.getItem('cacheTime') !== null) {
      const cacheTime = JSON.parse(localStorage.getItem('cacheTime') || '');
      if (cacheTime) {
        setCacheTime(cacheTime);
      }
    }
  }, []);

  return (
    <div>
      <Navigation resetAll={resetAll} />
      <MenuSelect
        isLoading={isLoading}
        order={order}
        setOrder={setOrder}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        menu={menu}
        fetchData={fetchData}
        restaurants={restaurants}
        chosenRestaurant={chosenRestaurant}
        chooseRestaurant={chooseRestaurant}
        chosenPizza={chosenPizza}
        choosePizza={choosePizza}
        cacheTime={cacheTime}
        handleAddClick={handleAddClick}
      />
      <Table
        order={order}
        orderCost={orderCost}
        handleRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default PizzaSelector;
