import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnails";
import "./App.css";
import AboutPage from "./components/AboutPage";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const getAllPokemons = async () => {
    setAllPokemons([]); // Clear previous Pokemon list
  
    const res = await fetch(currentPageUrl);
    const data = await res.json();
    setPrevPageUrl(data.previous);
    setNextPageUrl(data.next);
  
    const createPokemonObject = async (result) => {
      // Use Promise.all to wait for all fetch requests to complete
      const pokemonData = await Promise.all(
        result.map(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const data = await res.json();
          return data;
        })
      );
  
      // Sort the pokemonData array by ID in ascending order
      const sortedPokemonData = pokemonData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  
      // Update the state with sorted Pokemon data
      setAllPokemons(sortedPokemonData);
    };
  
    createPokemonObject(data.results);
  };

  const handleNextPage = () => {
    setAllPokemons([]); // Clear previous Pokemon list
    setCurrentPageUrl(nextPageUrl);
  };

  const handlePrevPage = () => {
    setAllPokemons([]); // Clear previous Pokemon list
    setCurrentPageUrl(prevPageUrl);
  };

  useEffect(() => {
    getAllPokemons();
  }, [currentPageUrl]);

  return (
    <div className="app-container">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Pokedex</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home allPokemons={allPokemons} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} prevPageUrl={prevPageUrl} nextPageUrl={nextPageUrl} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

const Home = ({ allPokemons, handleNextPage, handlePrevPage, prevPageUrl, nextPageUrl }) => {
  return (
    <>
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {/* Render the list of pokemons */}
          {allPokemons.map((pokemon, index) => 
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.front_default}  
              type={pokemon.types[0].type.name}
              key={index}
            />
          )}
        </div>
        <div className="pagination-container">
          <button className="prev-page" onClick={handlePrevPage} disabled={!prevPageUrl}>
            Previous
          </button>
          <button className="next-page" onClick={handleNextPage} disabled={!nextPageUrl}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;