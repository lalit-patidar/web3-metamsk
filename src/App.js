import { Route, Routes } from 'react-router-dom';
import './App.css';
import FetchBalance from './pages/Fetch-balance';
import SearchNfts from './pages/Search-nfts';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FetchBalance />} />
        <Route path='/nfts' element={<SearchNfts />} />
      </Routes>
    </div>
  );
}

export default App;
