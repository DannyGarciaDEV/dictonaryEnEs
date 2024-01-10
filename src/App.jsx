import React, { useState, useEffect } from 'react';
import wordServices from './services/words.jsx'; // Replace with your actual word services
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import your CSS file
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const appId = '<INSERT_SPEECHLY_APP_ID_HERE>';
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

// const Dictaphone = () => {
//   const {
//     transcript,
//     listening,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();
//   const startListening = () => SpeechRecognition.startListening({ continuous: true });

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button
//         onTouchStart={startListening}
//         onMouseDown={startListening}
//         onTouchEnd={SpeechRecognition.stopListening}
//         onMouseUp={SpeechRecognition.stopListening}
//       >Hold to talk</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };

const Heading = ({ text }) => {
  return <h2>{text}</h2>;
};

const Filter = ({ text, value, handleNewChange }) => {
  return (
    <div>
      {text} <input value={value} onChange={handleNewChange} />
    </div>
  );
};

const Part = ({ text, value, handleNewChange }) => {
  return (
    <div>
      {text} <input value={value} onChange={handleNewChange} />
    </div>
  );
};

const Button = ({ type, text, handleNewChange }) => {
  return (
    <button type={type} onClick={handleNewChange}>
      {text}
    </button>
  );
};

const WordForm = ({ onSubmit, newEnglishWord, newSpanishWord, handleNewEnglishWord, handleNewSpanishWord }) => {
  return (
    <form onSubmit={onSubmit}>
      <Part text="English Word:" value={newEnglishWord} handleNewChange={handleNewEnglishWord} />
      <Part text="Spanish Translation:" value={newSpanishWord} handleNewChange={handleNewSpanishWord} />
      <Button text="add" type="submit" />
    </form>
  );
};

const WordsList = ({ wordsAfterFilter }) => {
  return <ul>{wordsAfterFilter}</ul>;
};

const App = () => {
  const [words, setWords] = useState([]);
  const [newEnglishWord, setNewEnglishWord] = useState('');
  const [newSpanishWord, setNewSpanishWord] = useState('');
  const [filterEnglishWord, setFilterEnglishWord] = useState('');
  

  useEffect(() => {
    wordServices.getAll().then((initialResult) => {
      setWords(initialResult);
    });
  }, []);

  const addWord = async (event) => {
    event.preventDefault();
    const newWord = {
      englishWord: newEnglishWord,
      spanishWord: newSpanishWord,
    };

    const checkEnglishWord = words.find(
      (word) => word.englishWord.toLowerCase() === newWord.englishWord.toLowerCase()
    );

    if (checkEnglishWord) {
      toast.error(`${newEnglishWord} is already added to the dictionary`);
    } else {
      try {
        const returnedWord = await wordServices.create(newWord);
        setWords(words.concat(returnedWord));
        setNewEnglishWord('');
        setNewSpanishWord('');
        toast.success(`Successfully added ${newEnglishWord}`);
      } catch (error) {
        toast.error(`[Error] ${error.response.data.error}`);
      }
    }

    // Clear the notification after 5 seconds
    setTimeout(() => {
      toast.dismiss(); // Clear all notifications
    }, 5000);
  };

  const handleNewEnglishWord = (event) => {
    setNewEnglishWord(event.target.value);
  };

  const handleNewSpanishWord = (event) => {
    setNewSpanishWord(event.target.value);
  };

  const handleFilterEnglishWord = (event) => {
    setFilterEnglishWord(event.target.value);
  };

  const deleteWord = async (id, englishWord) => {
    if (window.confirm(`Delete ${englishWord}?`)) {
      try {
        await wordServices.removeWord(id);
        setWords(words.filter((w) => w.id !== id));
        toast.success(`Successfully deleted ${englishWord}`);
      } catch (error) {
        console.error('Error deleting word:', error);
        if (error.response && error.response.status === 404) {
          // Word not found, might have already been deleted
          toast.error(`Word ${englishWord} not found or already deleted`);
        } else {
          // Other error
          toast.error(`Error deleting ${englishWord}: ${error.message}`);
        }
      }

      // Set a timeout to clear the notification after 5 seconds
      setTimeout(() => {
        toast.dismiss(); // Clear all notifications
      }, 5000);

      // Refresh the data after deleting a word
      wordServices.getAll().then((result) => {
        setWords(result);
      });
    }
  };

  const WordItem = ({ englishWord, spanishWord, id }) => {
    return (
      <li className="english">
      {englishWord} - <span className="spanish">{spanishWord}</span>
      <Button
        text="delete"
        type="button"
        handleNewChange={() => deleteWord(id, englishWord)}
      />
    </li>
    );
  };

  // Move the declaration of filteredWords here
  const filteredWords = words
    ? words.filter((word) =>
        word.englishWord.toLowerCase().includes(filterEnglishWord.toLowerCase())
      )
    : [];

  const wordsAfterFilter = filteredWords.map((word) => (
    <WordItem key={word.id} englishWord={word.englishWord} spanishWord={word.spanishWord} id={word.id} />
  ));

  return (
    <div className="container">
    <Heading text="Dictionary" />
    <Filter
      text="Filter words with"
      value={filterEnglishWord}
      handleNewChange={handleFilterEnglishWord}
    />
    <Heading text="Add a new Word" />
    <WordForm
      onSubmit={addWord}
      newEnglishWord={newEnglishWord}
      newSpanishWord={newSpanishWord}
      handleNewEnglishWord={handleNewEnglishWord}
      handleNewSpanishWord={handleNewSpanishWord}
    />
    <Heading text="Words List" />
    <WordsList wordsAfterFilter={wordsAfterFilter} />
    {/* <Dictaphone/> */}
    <ToastContainer />
  </div>
);
};

export default App;
