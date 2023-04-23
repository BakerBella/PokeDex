import React from 'react'

const About = () => {
    return (
        <div className="about-container">
            <h1>About our Pokedex</h1>
            <p>
                Our Pokedex is a comprehensive collection of information about various Pokemon species.
                It provides detailed data on each Pokemon's name, ID, image, and type, retrieved from the PokeAPI.
                Users can browse through the list of Pokemon by switching back and forth between the next page and previous page buttons.
                The Pokedex is built using React and React Router, making it a dynamic and responsive web application.
                It's a fun and interactive way to explore the world of Pokemon and learn more about your favorite Pokemon species!
            </p>
        </div>
    );
};

export default About;
