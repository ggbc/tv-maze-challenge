import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ShowCard } from '../components/ShowCard';
import type { Show } from '../types';
import api from '../services/api';

export function SearchPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setShows([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/shows?q=${encodeURIComponent(query)}`);
      setShows(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>🎬 TV Challenge</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666' }}>
          Searching...
        </p>
      )}

      <div style={{ marginTop: '16px' }}>
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onClick={(s) => navigate(`/shows/${s.id}`)}
          />
        ))}
      </div>
    </div>
  );
}