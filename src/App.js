import { Route, Routes } from 'react-router-dom';
import './App.css';
import HousePage from './pages/HousePage/HousePage';
import TableOfChars from './pages/TableOfChars/TableOfChars';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TableOfChars />} />
        <Route path="/houses/:id" element={<HousePage />} />
      </Routes>

    </div>
  );
}

export default App;
