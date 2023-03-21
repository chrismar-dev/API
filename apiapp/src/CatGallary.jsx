import React, { useState, useEffect } from 'react';

function CatBreedGenerator() {
  const [currentBreed, setCurrentBreed] = useState('');
  const [currentBreedImage, setCurrentBreedImage] = useState('');
  const [currentBreedDescription, setCurrentBreedDescription] = useState('');
  const [currentBreedLifespan, setCurrentBreedLifespan] = useState('');
  const [banList, setBanList] = useState([]);

  useEffect(() => {
    async function generateRandomBreed() {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await response.json();

      // filter out banned breeds
      const filteredData = data.filter(breed => !banList.includes(breed.name));
      if (filteredData.length === 0) {
        alert('You have banned all cat breeds!');
        return;
      }

      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomBreed = filteredData[randomIndex];
      setCurrentBreed(randomBreed.name);
      setCurrentBreedDescription(randomBreed.description);
      setCurrentBreedLifespan(randomBreed.life_span);

      const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${randomBreed.id}`);
      const imageData = await imageResponse.json();
      setCurrentBreedImage(imageData[0].url);
    }

    generateRandomBreed();
  }, [banList]);

  function handleBreedClick() {
    setBanList([...banList, currentBreed]);
  }

  function handleButtonClick() {
    async function generateRandomBreed() {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await response.json();

      // filter out banned breeds
      const filteredData = data.filter(breed => !banList.includes(breed.name));
      if (filteredData.length === 0) {
        alert('You have banned all cat breeds!');
        return;
      }

      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomBreed = filteredData[randomIndex];
      setCurrentBreed(randomBreed.name);
      setCurrentBreedDescription(randomBreed.description);
      setCurrentBreedLifespan(randomBreed.life_span);

      const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${randomBreed.id}`);
      const imageData = await imageResponse.json();
      setCurrentBreedImage(imageData[0].url);
    }

    generateRandomBreed();
  }

  return (
    <div className='item'>
      <button onClick={handleButtonClick}>Generate Random Cat Breed</button>
      {currentBreed && (
        <div>
          <button onClick={handleBreedClick}>{currentBreed}</button>
          {currentBreedImage && <img src={currentBreedImage} alt={currentBreed} />}
          {currentBreedDescription && <p>{currentBreedDescription}</p>}
          {currentBreedLifespan && <p>Life Span: {currentBreedLifespan}</p>}
        </div>
      )}
      <div>
        <h3>Ban List</h3>
        <ul>
          {banList.map(breed => (
            <li key={breed}>{breed}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CatBreedGenerator;
