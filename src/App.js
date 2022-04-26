import React, {useEffect,useState} from 'react';
import './App.scss';
import colorsArray from "./colors.js"
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

//import 'bootstrap/dist/css/bootstrap.min.css';

//const myQuoteArray = [{quote:"We become what we think about", author: "-Earl Nightingale"},
//                {quote:"People who are crazy enough to think they can change the world, are the ones who do.", author: "-Rob Siltanen"},
//                {quote:"All our dreams can come true if we have the courage to pursue them.", author: "-Walt Disney"}];

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("We become what we think about");
  const [author, setAuthor] = useState("Earl Nightingale");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [newColor, setColor] = useState("#500000");

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON);
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

   function newQuote() {
     let randomInteger = Math.floor(Math.random() * quotesArray.length);
     setRandomNumber(randomInteger);
     setColor(colorsArray[randomInteger]);
     setQuote(quotesArray[randomInteger].quote);
     setAuthor(quotesArray[randomInteger].author);
   }
  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/5f776bc5d2.js" crossorigin="anonymous"></script>
      <header className="App-header" style={{backgroundColor:newColor}}>
        <div id="quote-box" style={{color:newColor}}>
        <h1>Motivational Quote Generator</h1>
        <p id="text">
          {quote}
        </p>
        <p id="author">
          -{author}
        </p>
        <div className="tweetButton">
        <a style={{backgroundColor:newColor}} id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter}/></a>
        <Button style={{backgroundColor:newColor}} id="new-quote" onClick={()=>newQuote()}>Change Quote</Button>
        </div> 
        </div>
      </header>
    </div>
  );
}

export default App;
