import React from 'react';
import './App.css';
import CustomRouter from './routes/customRouter';
import { Header } from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <CustomRouter />
    </div>
  );
}

export default App;
