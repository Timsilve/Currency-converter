import { useState, useEffect } from "react";
import "./App.css";

// [https://api.frankfurter.app/latest]

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted,setConverted] = useState('');

  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {

    async function Exchange() {
      setIsLoading(true)
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
      const data = await res.json()

      setConverted(data.rates[toCur]);
      setIsLoading(false)
    }
    if (fromCur === toCur ) return setConverted(amount);
    Exchange()
    }
  , [amount,fromCur,toCur])

  return (
    <>
      <div className="App">
        <div className="selput">
        <input
          type="text"
          value={amount} onChange={(e) => setAmount(Number(e.target.value))} disabled={isLoading}
        />
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)} disabled={isLoading}>
          <option value="EUR">Euro</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toCur}
        onChange={(e) => setToCur(e.target.value)} disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">Euro</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        </div>

        <h1>{converted} {toCur}</h1>
      </div>
    </>
  );
}

export default App;

