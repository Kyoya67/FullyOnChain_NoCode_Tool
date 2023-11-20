// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollectionList from './components/CollectionList';
import FullyOnChainFactory from './components/FullyOnChainFactory';
import FullyOnChainMint from './components/FullyOnChainMint';
import { WalletProvider } from './contexts/WalletContext';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionList />} />
          <Route path="/new-collection" element={<FullyOnChainFactory />} />
          <Route path="/mint/:address" element={<FullyOnChainMint />} /> {/* 新しいルート */}
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
