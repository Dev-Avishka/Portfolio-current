import { useState } from 'react';
import './styles/app.universal.css';
import './styles/calc.css';

export default function Calc() {
  const [display, setDisplay] = useState('0');
  const [secondaryDisplay, setSecondaryDisplay] = useState('');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [isRadians, setIsRadians] = useState(true);
  const [isShiftActive, setIsShiftActive] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setSecondaryDisplay('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(display);
      setSecondaryDisplay(`${display} ${nextOperator} `);
    } else if (operator) {
      const currentValue = parseFloat(prevValue);
      let newValue: number;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        case '^':
          newValue = Math.pow(currentValue, inputValue);
          break;
        default:
          newValue = inputValue;
      }

      // Format the result to prevent excessive decimal places
      const formattedValue = formatNumberForDisplay(newValue);
      
      setPrevValue(formattedValue);
      setDisplay(formattedValue);
      
      if (nextOperator === '=') {
        setSecondaryDisplay(`${secondaryDisplay}${display} = `);
      } else {
        setSecondaryDisplay(`${formattedValue} ${nextOperator} `);
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator || prevValue === null) {
      return;
    }
    
    performOperation('=');
    setOperator(null);
  };

  // Format numbers for display
  const formatNumberForDisplay = (num: number): string => {
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';
    
    // Convert to string with appropriate precision
    const numStr = Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-4 && Math.abs(num) > 0)
      ? num.toExponential(6)
      : String(Math.round(num * 1e10) / 1e10);
      
    return numStr;
  };

  // Scientific functions
  const calculateSin = () => {
    const value = parseFloat(display);
    const angle = isRadians ? value : (value * Math.PI / 180);
    const result = isShiftActive ? Math.asin(value) : Math.sin(angle);
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${isShiftActive ? 'asin' : 'sin'}(${display}) = `);
    setIsShiftActive(false);
  };

  const calculateCos = () => {
    const value = parseFloat(display);
    const angle = isRadians ? value : (value * Math.PI / 180);
    const result = isShiftActive ? Math.acos(value) : Math.cos(angle);
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${isShiftActive ? 'acos' : 'cos'}(${display}) = `);
    setIsShiftActive(false);
  };

  const calculateTan = () => {
    const value = parseFloat(display);
    const angle = isRadians ? value : (value * Math.PI / 180);
    const result = isShiftActive ? Math.atan(value) : Math.tan(angle);
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${isShiftActive ? 'atan' : 'tan'}(${display}) = `);
    setIsShiftActive(false);
  };

  const calculateLog = () => {
    const value = parseFloat(display);
    const result = isShiftActive ? Math.pow(10, value) : Math.log10(value);
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${isShiftActive ? '10^' : 'log'}(${display}) = `);
    setIsShiftActive(false);
  };

  const calculateLn = () => {
    const value = parseFloat(display);
    const result = isShiftActive ? Math.exp(value) : Math.log(value);
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${isShiftActive ? 'e^' : 'ln'}(${display}) = `);
    setIsShiftActive(false);
  };

  const calculateSqrt = () => {
    const value = parseFloat(display);
    const result = isShiftActive ? value * value : Math.sqrt(value);
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${isShiftActive ? display + '²' : '√' + display} = `);
    setIsShiftActive(false);
  };

  const calculatePi = () => {
    setDisplay(String(Math.PI));
    setWaitingForOperand(true);
  };

  const calculateE = () => {
    setDisplay(String(Math.E));
    setWaitingForOperand(true);
  };

  const toggleMode = () => {
    setIsRadians(!isRadians);
  };

  const toggleShift = () => {
    setIsShiftActive(!isShiftActive);
  };

  // Memory functions
  const memoryStore = () => {
    setMemory(parseFloat(display));
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const calculateFactorial = () => {
    const num = parseInt(display);
    if (num < 0) {
      setDisplay("Error");
      return;
    }
    
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    
    setDisplay(formatNumberForDisplay(result));
    setWaitingForOperand(true);
    setSecondaryDisplay(`${display}! = `);
  };

  return (
    <div className="app compact-calc-app">
      <div className="compact-calculator">
        <div className="display-container">
          <div className="secondary-display">{secondaryDisplay}</div>
          <div className="primary-display">{display}</div>
          <div className="mode-indicator">
            <span className={isRadians ? 'active' : ''}>RAD</span>
            <span className={!isRadians ? 'active' : ''}>DEG</span>
            <span className={isShiftActive ? 'shift-active' : ''}>SHIFT</span>
            <span className={memory !== 0 ? 'memory-active' : ''}>M</span>
          </div>
        </div>
        
        <div className="calculator-keypad">
          {/* Row 1 */}
          <button className="calc-btn function" onClick={memoryClear}><small>MC</small></button>
          <button className="calc-btn function" onClick={memoryRecall}><small>MR</small></button>
          <button className="calc-btn function" onClick={memoryAdd}><small>M+</small></button>
          <button className="calc-btn function" onClick={memoryStore}><small>MS</small></button>
          <button className="calc-btn function shift" onClick={toggleShift}><small>SHIFT</small></button>
          <button className="calc-btn function" onClick={toggleMode}><small>{isRadians ? 'RAD' : 'DEG'}</small></button>
          <button className="calc-btn delete" onClick={clearAll}><small>AC</small></button>
          <button className="calc-btn delete" onClick={clearEntry}><small>CE</small></button>
          
          {/* Row 2 */}
          <button className="calc-btn function" onClick={() => {
            const value = parseFloat(display);
            setDisplay(formatNumberForDisplay(1/value));
            setSecondaryDisplay(`1/${display} = `);
          }}><small>1/x</small></button>
          <button className="calc-btn function" onClick={() => {
            const value = parseFloat(display);
            setDisplay(formatNumberForDisplay(Math.abs(value)));
            setSecondaryDisplay(`|${display}| = `);
          }}><small>|x|</small></button>
          <button className="calc-btn function" onClick={calculateFactorial}><small>x!</small></button>
          <button className="calc-btn function" onClick={() => performOperation('^')}><small>x^y</small></button>
          <button className="calc-btn function" onClick={calculatePi}><small>π</small></button>
          <button className="calc-btn function" onClick={calculateE}><small>e</small></button>
          <button className="calc-btn delete" onClick={toggleSign}><small>±</small></button>
          <button className="calc-btn operator" onClick={inputPercent}><small>%</small></button>
          
          {/* Row 3 */}
          <button className="calc-btn function" onClick={calculateSin}>
            <small>{isShiftActive ? 'asin' : 'sin'}</small>
          </button>
          <button className="calc-btn function" onClick={calculateCos}>
            <small>{isShiftActive ? 'acos' : 'cos'}</small>
          </button>
          <button className="calc-btn function" onClick={calculateTan}>
            <small>{isShiftActive ? 'atan' : 'tan'}</small>
          </button>
          <button className="calc-btn function" onClick={calculateLog}>
            <small>{isShiftActive ? '10^x' : 'log'}</small>
          </button>
          <button className="calc-btn function" onClick={calculateLn}>
            <small>{isShiftActive ? 'e^x' : 'ln'}</small>
          </button>
          <button className="calc-btn function" onClick={calculateSqrt}>
            <small>{isShiftActive ? 'x²' : '√'}</small>
          </button>
          <button className="calc-btn operator" onClick={() => {
            const radians = parseFloat(display) * (Math.PI / 180);
            setDisplay(formatNumberForDisplay(radians));
            setSecondaryDisplay(`${display}° to rad = `);
          }}><small>°→rad</small></button>
          <button className="calc-btn operator" onClick={() => {
            const degrees = parseFloat(display) * (180 / Math.PI);
            setDisplay(formatNumberForDisplay(degrees));
            setSecondaryDisplay(`${display} rad to ° = `);
          }}><small>rad→°</small></button>
          
          {/* Row 4 */}
          <button className="calc-btn number" onClick={() => inputDigit('7')}>7</button>
          <button className="calc-btn number" onClick={() => inputDigit('8')}>8</button>
          <button className="calc-btn number" onClick={() => inputDigit('9')}>9</button>
          <button className="calc-btn number" onClick={() => inputDigit('4')}>4</button>
          <button className="calc-btn number" onClick={() => inputDigit('5')}>5</button>
          <button className="calc-btn number" onClick={() => inputDigit('6')}>6</button>
          <button className="calc-btn operator" onClick={() => performOperation('÷')}>÷</button>
          <button className="calc-btn operator" onClick={() => performOperation('×')}>×</button>
          
          {/* Row 5 */}
          <button className="calc-btn number" onClick={() => inputDigit('1')}>1</button>
          <button className="calc-btn number" onClick={() => inputDigit('2')}>2</button>
          <button className="calc-btn number" onClick={() => inputDigit('3')}>3</button>
          <button className="calc-btn number zero" onClick={() => inputDigit('0')}>0</button>
          <button className="calc-btn number" onClick={inputDot}>.</button>
          <button className="calc-btn operator" onClick={() => performOperation('-')}>−</button>
          <button className="calc-btn operator" onClick={() => performOperation('+')}>+</button>
          <button className="calc-btn equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}