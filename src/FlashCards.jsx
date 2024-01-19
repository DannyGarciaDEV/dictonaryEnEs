import React from 'react';

const FlashCards = () => {
  // Sample flashcards data
  const flashcards = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    { question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
    // Add more flashcards as needed
  ];

  return (
    <div>
      <h2>Flash Cards</h2>
      <div>
        {flashcards.map((flashcard, index) => (
          <div key={index} className="flashcard">
            <div className="question">{flashcard.question}</div>
            <div className="answer">{flashcard.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashCards;