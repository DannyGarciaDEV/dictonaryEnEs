import React, { useState } from 'react';
import wordServices from './services/words.jsx';

const WordText = ({ setWords }) => {
  const [wordM, setWordM] = useState('');
  const [data, setData] = useState(null);

  const handleTranslateClick = () => {
    if (wordM) {
      fetch(`https://api.mymemory.translated.net/get?q=${wordM}&langpair=en|es`)
        .then((response) => response.json())
        .then((translatedData) => {
          console.log('Translated Data:', translatedData); // Log translated data
          setData(translatedData);
        })
        .catch((error) => {
          console.error("Error fetching translation:", error);
          setData(null);
        });
    } else {
      setData(null);
    }
  };

  const handleInputChange = (event) => {
    setWordM(event.target.value);
  };

  const handleSaveToDbClick = async () => {
    if (data && data.responseData && data.responseData.translatedText) {
      try {
        const response = await fetch('http://localhost:3001/words', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ englishWord: wordM, spanishWord: data.responseData.translatedText }),
        });

        const result = await response.json();

        console.log('Translation saved to db.json:', result);
        // Display a success message if needed

        const updatedWords = await wordServices.getAll();
        setWords(updatedWords); // Update words after saving
      } catch (error) {
        console.error('Error saving translation to db.json:', error);
        // Display an error message if needed
      }
    }
  
  };

  console.log('Render Data:', data); // Log data before rendering

  return (
    <div>
      <h2>Translate</h2>
      <p>Use this translator English to Spanish</p>

      <textarea
        className='word'
        type="text"
        placeholder="Enter an English word"
        value={wordM}
        onChange={handleInputChange}
      ></textarea>

      <button onClick={handleTranslateClick}>Translate</button>

      {/* Conditionally render the translated text and the "Add" button */}
      {data && data.responseData && (
        <p>
          {data.responseData.translatedText}{' '}
          <button onClick={handleSaveToDbClick}>Add</button>
        </p>
      )}
    </div>
  );
};

export default WordText;
