import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { ShowDetailsPage } from './pages/ShowDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/shows/:id" element={<ShowDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}