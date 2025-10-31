import axios from 'axios';
import React, { useState } from 'react';
import './Food.css';
import cake from './images/cake2.png';

const Food = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const APP_ID = 'a0cb2036';
  const APP_KEY = '92264c96f86689d81c3ca796c5b28911';

  const getRecipes = async () => {
    if (!query) return;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free`;
    const result = await axios.get(url);
    setRecipes(result.data.hits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className="header">
      <nav className="nav">
        <div className="logo">
          <img src={cake} alt="logo" className="img-1" />
        </div>
        <ul className="ul">
          <li><a href="#">Sponsors</a></li>
          <li><a href="#">Klanten</a></li>
          <li><a href="#">Maaltijden</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        <form className="form_1" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Voer een gerecht in..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="button-3" type="submit">Zoeken</button>
        </form>
      </nav>

      <div className="text">
        <h1><span className="span-h2">Snelste levering </span>ter wereld</h1>
        <p>Voel de <span>smaak</span></p>
      </div>

      <section className="print">
        {recipes.map((item, index) => (
          <div key={index} className="product">
            <img src={item.recipe.image} alt={item.recipe.label} />
            <h3>{item.recipe.label}</h3>
            <p><span>Calorieën:</span> {item.recipe.calories.toFixed(2)}</p>
            <div className="buttons">
              <a className="read-btn" href={item.recipe.url} target="_blank" rel="noreferrer">Bekijken</a>
              <button className="button-2">Bestellen</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Food;
