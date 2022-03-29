import React, { useEffect, useState } from "react";
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

  const handleAddToOrder = (meal) => {
    console.log(meal);
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
