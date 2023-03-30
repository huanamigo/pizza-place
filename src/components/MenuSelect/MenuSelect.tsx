import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import styles from './MenuSelect.module.scss'

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
    value: number;
    label: string;
}
  chooseRestaurant: React.Dispatch<React.SetStateAction<{
    value: number;
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

  isLoading: boolean
}


const MenuSelect = ({menu,  restaurants, chosenRestaurant, isDisabled, chosenPizza, cacheTime, setIsDisabled, fetchData, chooseRestaurant, choosePizza, isLoading}:IProps) => {

  const [pizzas, setPizzas] = useState<any>([{ //any because typescript dont know what filtering is
    value: 0,
    label: '', 
    price: 0
  }])

  useEffect(() => {
      let pizzasTemp = menu.map(pizza => {
          // why tf category searching does not work
          if(pizza.category === 'Pizza') {
            return {value: pizza.id,label: pizza.name, price: pizza.price}
          } else return undefined
        } 
      )
      pizzasTemp = pizzasTemp.filter(item => item !== undefined).map(item => item)
      setPizzas(pizzasTemp)
  }, [menu])
  

  const rest = restaurants.map(restaurant => (
    {
      value: restaurant.id,
      label: restaurant.name
    }
  ))

  const selectColors = {
    primary: '#f1f1f1',
    primary25: '#303030',
    primary50: "#505050",
    primary75: "white",
    danger: "white",
    dangerLight: "red",
    neutral0: "#050505",
    neutral5: "#202020",
    neutral10: "#404040",
    neutral20: "#505050",
    neutral30: "#f1f1f1",
    neutral40: "gray",
    neutral50: "white",
    neutral60: "#f1f1f1",
    neutral70: "white",
    neutral80: "#e0e0e0",
    neutral90: "white",
  }


  return (
    <div>
      <Select className={styles.reactSelectContainer}  theme={theme => ({
      ...theme,
      colors: selectColors,
    })} options={rest} value={chosenRestaurant} isLoading={isLoading} noOptionsMessage={() => <p>asd</p>} isSearchable onFocus={() => {
        if(Date.now() - cacheTime >= 36000000) {
          fetchData('https://private-anon-f64827731d-pizzaapp.apiary-mock.com/restaurants/', "restaurant")
        }
      }} onChange={(e) => {
        if(e !== null) {
            chooseRestaurant(e)
        }
        setIsDisabled(false)
        if(Date.now() - cacheTime >= 36000000) {
          fetchData(`http://private-anon-f64827731d-pizzaapp.apiary-mock.com/restaurants/${chosenRestaurant.value}/menu`, "menu")
        }
      }}
      />
      <Select className={styles.reactSelectContainer} options={pizzas} value={chosenPizza} isDisabled={isDisabled} isSearchable onChange={(e) => {
        if(e !== undefined && e !== null) {
          choosePizza(e)
        }
      }} theme={theme => ({
        ...theme,
        colors: selectColors,
        
     
      })}/>
    </div>
  )
}

export default MenuSelect