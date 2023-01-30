import React, { useEffect, useState } from 'react'
import Select from 'react-select'

interface IProps {
  menu: {
    id: number;
    category: string;
    name: string;
    topping?: string[];
    price: number;
    rank?: number;
  }[],
  restaurants: {
    id: number;
    name: string;
    address1: string;
    address2: string;
    latitude: number;
    longitude: number;
  }[],
  fetchData: (URL: string, toFetch: string) => Promise<void>
  chosenRestaurant: {
    id: number;
    label: string;
}
  chooseRestaurant: React.Dispatch<React.SetStateAction<{
    id: number;
    label: string;
  }>>

  chosenPizza: {
    id: number;
    label: string;
    price: number;
  }
  choosePizza: React.Dispatch<React.SetStateAction<{
    id: number;
    label: string;
    price: number;
  }>>

  order: {
    id: number
    restaurant: string;
    product: string;
    cost: number;
  }[],
  setOrder: React.Dispatch<React.SetStateAction<{
    id:number
    restaurant: string;
    product: string;
    cost: number;
  }[]>>

  isDisabled: boolean,
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>

  cacheTime: number
}


const MenuSelect = ({menu,  restaurants, chosenRestaurant, isDisabled, chosenPizza, cacheTime, setIsDisabled, fetchData, chooseRestaurant, choosePizza}:IProps) => {

  const [pizzas, setPizzas] = useState<any>([{ //any because typescript dont know what filtering is
    id: 0,
    label: '', 
    price: 0
  }])

  useEffect(() => {
      let pizzasTemp = menu.map(pizza => {
          // why tf category searching does not work
          if(pizza.category === 'Pizza') {
            return {id: pizza.id,label: pizza.name, price: pizza.price}
          } else return undefined
        } 
      )
      pizzasTemp = pizzasTemp.filter(item => item !== undefined).map(item => item)
      setPizzas(pizzasTemp)
  }, [menu])
  

  const rest = restaurants.map(restaurant => (
    {
      id: restaurant.id,
      label: restaurant.name
    }
  ))


  return (
    <div>
      <Select options={rest} value={chosenRestaurant} isSearchable onFocus={() => {
        if(Date.now() - cacheTime >= 36000000) {
          fetchData('https://private-anon-e10793997b-pizzaapp.apiary-mock.com/restaurants/', "restaurant")
        }
      }} onChange={(e) => {
        if(e !== null) {
            chooseRestaurant(e)
        }
        setIsDisabled(false)
        if(Date.now() - cacheTime >= 36000000) {
          fetchData(`http://private-anon-e10793997b-pizzaapp.apiary-mock.com/restaurants/${chosenRestaurant.id}/menu`, "menu")
        }
      }}
      />
      <Select options={pizzas} value={chosenPizza} isDisabled={isDisabled} isSearchable onChange={(e) => {
        if(e !== undefined && e !== null) {
          choosePizza(e)
        }
      }}/>
    </div>
  )
}

export default MenuSelect