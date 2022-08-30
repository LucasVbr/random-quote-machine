import React, {useEffect, useState} from 'react';
import './App.css';

type Quote = {
  id: string,
  author: string,
  en: string
}

const getRandomQuote = () => {
  return fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
  .then(res => res.json());
};

export default function App() {
  const [quote, setQuote] = useState({
    id: '', author: '', en: '',
  });

  const handleNewQuote = () => {
    getRandomQuote().then(json => setQuote(json));
  };

  // Init quote
  useEffect(() => {
    handleNewQuote();
  }, []);

  return (
      <div className="App">
        <div id={'quote-box'}>
          <p id={'text'}>{quote.en}</p>
          <p id={'author'}>- by {quote.author}</p>
          <button id={'new-quote'} onClick={handleNewQuote}>New quote</button>
          <br/>
          <a id={'tweet-quote'} target={'_blank'}
             href={'https://twitter.com/intent/tweet?hashtags=quotes&'
                 + `text="${escape(quote.en)}"${escape(quote.author)}`}>
            Tweet this
          </a>
        </div>
      </div>
  );
}
