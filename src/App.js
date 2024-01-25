
import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("0");

  const handleClick = (event) => {
    console.log(event.currentTarget.id);
    switch (event.currentTarget.id) {
      case 'ac':
        setDisplay('0');
        setExpression('0');
        break;
      case '/':
      case '*':
      case '+':
      case '-':
        if (expression.indexOf('=') >= 0) {
          setDisplay(event.currentTarget.id);
          setExpression(expression.slice(expression.indexOf('=')+1).concat(event.currentTarget.id))
          break;
        }
        if (expression[expression.length-1] === '*' || expression[expression.length-1] === '/' || expression[expression.length-1] === '+') {
          setDisplay(event.currentTarget.id);
          setExpression(expression.slice(0, expression.length-1).concat(event.currentTarget.id));
          break;
        }
        setDisplay(event.currentTarget.id);
        setExpression(expression.concat(event.currentTarget.id));
        break;
      case '=':
        computeExpression();
        //const val = computeExpression(expression);
        //setDisplay(val);
        //setExpression(expression + "= " + val);
        break;
      case '0':
        if(display.length === 1 && display[0] === '0') {
          break;
        }
      case '.': 
        if (display[display.length-1] === '.') {
          break;
        }
      default:
        if(expression.length > 1 && display === '0') {
          setDisplay(event.currentTarget.id);
          setExpression(expression.slice(0, expression.length-1).concat(event.currentTarget.id))
          break;
        }
        if(display.length === 1 && display[0] === '0') {
          setDisplay(event.currentTarget.id);
          setExpression(event.currentTarget.id);
          break;
        }
        //if (display[display.length-2] === '=') {
        //  setDisplay(event.currentTarget.id);
        //  setExpression(event.currentTarget.id);
        //  break;
        //}
        if (expression.indexOf('=') >= 0) {
          setDisplay(event.currentTarget.id);
          setExpression(event.currentTarget.id);
          break;
        }
        if ("/x+-".indexOf(expression[expression.length-1]) >= 0) {
          setDisplay(event.currentTarget.id);
          setExpression(expression.concat(event.currentTarget.id));
        } else {  
          setDisplay(display.concat(event.currentTarget.id));
          setExpression(expression.concat(event.currentTarget.id));
        }
    }
  }
  
  async function computeExpression() {
    let temp = expression;
    switch (temp[temp.length-1]) {
      case("+"):
      case('-'):
      case('*'):
      case('/'):
        temp = temp.slice(0, temp.length-1);
    }
    let promise = new Promise((resolve, reject) => {
      const regex = new RegExp('[+\-/*][+/*]+');
      //if (regex.test(expression)) {
      //  let r = doubleOperator();
      //  resolve(r);
      //} else {
        resolve(eval(temp));
      //}
    })
    let result = await promise;
    setDisplay(result);
    setExpression(temp + "=" + result);
  }

  async function doubleOperator() {
    let p = new Promise((resolve) => {
      let temp = expression;
      const regex = new RegExp('[+\-/*][+/*]+');
      while (regex.test(temp)) {
        console.log("we got here")
        let found = temp.match(regex);
        temp = temp.slice(0, temp.indexOf(found)) + temp.slice(temp.indexOf(found)+found.length);
        console.log(temp);  
      }
      resolve(temp)
    })
    let r = await p;
    setExpression(r);
    console.log(eval(r));
    return eval(r);
  }

  function compute(exp) {
    let temp = exp;
    const regex = new RegExp('^[\d.]+[+\-/*][\d.]+')
    while(regex.test(temp)) {
      let found = temp.match(regex);

    }
  }
  return (
    <div className="App">
      <div id="calculator">
        <div id="display-one">{expression}</div>
        <div id="display-two">{display}</div>
        <container id="grid">
          <div id="ac" className='button ac' onClick={handleClick}>AC</div>
          <div id="/" className='button operator divide' onClick={handleClick}>/</div>
          <div id="*" className='button operator multiply' onClick={handleClick}>x</div>
          <div id="7" className='button seven' onClick={handleClick}>7</div>
          <div id="8" className='button eight' onClick={handleClick}>8</div>
          <div id="9" className='button nine' onClick={handleClick}>9</div>
          <div id="-" className="button operator minus" onClick={handleClick}>-</div>
          <div id="4" className="button four" onClick={handleClick}>4</div>
          <div id="5" className="button five" onClick={handleClick}>5</div>
          <div id="6" className="button six" onClick={handleClick}>6</div>
          <div id="+" className="button operator plus" onClick={handleClick}>+</div>
          <div id="1" className="button one" onClick={handleClick}>1</div>
          <div id="2" className="button two" onClick={handleClick}>2</div>
          <div id="3" className='button three' onClick={handleClick}>3</div>
          <div id="=" className='button equal' onClick={handleClick}>=</div>
          <div id="0" className="button zero" onClick={handleClick}>0</div>
          <div id="." className="button decimal" onClick={handleClick}>.</div>
        </container>
      </div>
      <p id="coder">Designed and coded by Alex Aney</p>
    </div>
  );
}

export default App;
