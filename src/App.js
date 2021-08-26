import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import Nav from "./nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const text = "There are many variations";

const Home = () => {
  return (
    <div className="homePage">
      <h2>Home Page</h2>
    </div>
  );
};

function App() {
  const [saveForLaterList, setSaveForLaterList] = useState([]);
  const inputRef = useRef();
  const [cardItemList, setcardItemList] = useState([]);

  const generateTexts = () => {
    let arr = [];
    for (let i = 0; i < inputRef.current.value; i++) {
      arr.push(text.concat(Math.random()));
    }
    setcardItemList(arr);
  };

  const saveForLaterItem = (text, index) => {
    setSaveForLaterList([...saveForLaterList, text]);

    let removeFromCardItemList = cardItemList.filter(
      (eachItem, idx) => idx !== index
    );

    setcardItemList([...removeFromCardItemList]);
  };

  const addBackToCart = (text, index) => {
    setcardItemList([...cardItemList, text]);

    let removeFromSaveForLaterList = saveForLaterList.filter(
      (eachItem, idx) => idx !== index
    );

    setSaveForLaterList([...removeFromSaveForLaterList]);
  };

  const modifyAnyItem = (each, idx, arrayOfList) => {
    let modifyItem = prompt(`Please Enter the text to modify.`);

    if (modifyItem && modifyItem.trim().length > 0) {
      for (let g = 0; g < arrayOfList.length; g++) {
        if (arrayOfList[g] === each) {
          arrayOfList[g] = modifyItem;
        }
      }
      return arrayOfList;
    } else {
      return "";
    }
  };

  const modifyCardListItem = (evt, each, idx) => {
    evt.preventDefault();
    const list = modifyAnyItem(each, idx, cardItemList);
    if (list.length) {
      setcardItemList([...list]);
    }
  };

  const modifySaveForLaterList = (evt, each, idx) => {
    evt.preventDefault();
    const list = modifyAnyItem(each, idx, saveForLaterList);
    if (list.length) {
      setSaveForLaterList([...list]);
    }
  };

  let a = {
    b: 45,
    c: 89,
  };

  let f = [45, 89, 85];
  return (
    <Router>
      <div className="App">
        <Nav val={f} a={a} />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart">
          <section>
            <div className="container">
              <h2>Card Item List</h2>
              <form
                onSubmit={(evt) => {
                  evt.preventDefault();
                  generateTexts();
                }}
              >
                <input
                  type="number"
                  ref={inputRef}
                  placeholder="Enter text up to 8"
                  min="1"
                  max="8"
                  title="Max 8"
                  className="inputType"
                  autoFocus
                ></input>
                <button type="submit">Submit</button>
              </form>
              {!!cardItemList.length &&
                cardItemList.map((each, index) => {
                  return (
                    <div key={index} className="eachContent">
                      <span>{each}</span>
                      <button
                        onClick={() => {
                          saveForLaterItem(each, index);
                        }}
                      >
                        Save For Later
                      </button>
                      <button
                        onClick={(evt) => {
                          modifyCardListItem(evt, each, index);
                        }}
                      >
                        &#9998;
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="container">
              <h2>Save for Later List</h2>
              <div className="decreaseSize">
                {saveForLaterList.map((text, index) => {
                  return (
                    <div key={index} className="eachContent">
                      <span>{text}</span>
                      <button
                        onClick={() => {
                          addBackToCart(text, index);
                        }}
                      >
                        Add To Cart
                      </button>
                      <button
                        onClick={(evt) => {
                          modifySaveForLaterList(evt, text, index);
                        }}
                      >
                        &#9998;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Route>
      </div>
    </Router>
  );
}

export default App;
