import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Meal from "../Meal/Meal";
import OrderList from "../OrderList/OrderList";
import "./Restaurant.css";

const Restaurant = () => {
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=fish")
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, []);
  useEffect(() => {
    const storedOrder = getStoredCart();
    const savedOrder = [];
    for (const id in storedOrder) {
      const addedMeal = meals.find((meal) => meal.idMeal === id);
      if (addedMeal) {
        const quantity = storedOrder[id];
        addedMeal.quantity = quantity;
        savedOrder.push(addedMeal);
      }
    }
    setOrders(savedOrder);
  }, [meals]);

  const handleAddToOrder = (meal) => {
    const newOrders = [...orders, meal];
    setOrders(newOrders);
    addToDb(meal.idMeal);
  };

  /* 
        The above api link or the below method will now work for search. 
        if you want to implement search in this code. 
        1. add a input field 
        2. declare a state to keep search field text
        3. Make meal loading api to dependant on search text
        4. change the meal loading api.you */

  return (
    <div className="restaurant-menu">
      <div className="meals-container">
        {meals.map((meal) => (
          <Meal
            key={meal.idMeal}
            meal={meal}
            handleAddToOrder={handleAddToOrder}
          ></Meal>
        ))}
      </div>
      <div className="order-list">
        <OrderList orders={orders}></OrderList>
      </div>
    </div>
  );
};

export default Restaurant;
