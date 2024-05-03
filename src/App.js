import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [poundsOfPotatoes, setPoundsOfPotatoes] = useState('');
  const [cheapestSuppliers, setCheapestSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchCheapestSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/potatoes', {
        params: { pounds: poundsOfPotatoes }
      });
      setCheapestSuppliers(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching cheapest suppliers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <body>
      <h1>Potato Price Finder</h1>
      <div className='clients_input'>
        <label htmlFor="poundsOfPotatoes">Pounds of Potatoes :</label>
        <input
          type="number"
          id="poundsOfPotatoes"
          value={poundsOfPotatoes}
          onChange={(e) => setPoundsOfPotatoes(e.target.value)}
        />
      </div>
      <button onClick={handleFetchCheapestSuppliers} disabled={!poundsOfPotatoes || loading}>
        {loading ? 'Fetching...' : 'Fetch Cheapest Suppliers'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>Cheapest Suppliers</h2>
      <ul>
        {cheapestSuppliers.map((supplier) => (
          <li key={supplier.name}>
            {supplier.name} - Price Per Pound: ${supplier.unitPrice / supplier.weight}, Quantity Available: {supplier.quantityAvailable}
          </li>
        ))}
        {cheapestSuppliers.length === 0 && !loading &&<p>Please enter your required quantity to get started.</p>}
      </ul>
      </body>
  );
}

export default App;
