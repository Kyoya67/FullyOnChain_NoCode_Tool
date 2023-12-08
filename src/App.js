import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollectionList from './components/original/CollectionList';
import Factory from './components/original/Factory';
import Mint from './components/original/Mint';
import TripleHelix from './components/readyMade/TripleHelix/TripleHelix';
import WorkList from './components/readyMade/WorkList';
import { WalletProvider } from './contexts/WalletContext';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="app-background"> {/* クラス名を追加 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionList/>} />
            <Route path="/new-collection" element={<Factory/>} />
            <Route path="/mint/:address" element={<Mint/>} /> 
            <Route path="/worklist" element={<WorkList/>} />
            <Route path="/tripleHelix" element={<TripleHelix/>} /> 
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}


export default App;
