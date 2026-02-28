import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EpisodeCard } from '../components/EpisodeCard';
import type { Show, Episode, Comment } from '../types';
import api from '../services/api';

export function ShowDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, commentsRes] = await Promise.all([
          api.get(`/shows/${id}`),
          api.get(`/shows/${id}/comments`),
        ]);
        setShow(detailsRes.data.show);
        setEpisodes(detailsRes.data.episodes);
        setComments(commentsRes.data);
      } catch (error) {
        console.error('Error loading details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleWatchedChange = async (episode: Episode, watched: boolean) => {
    try {
      await api.patch(`/episodes/${episode.id}/watched`, { episode, watched });
      setEpisodes((prev) =>
        prev.map((ep) => (ep.id === episode.id ? { ...ep, watched } : ep))
      );
    } catch (error) {
      console.error('Error updating episode:', error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const response = await api.post('/episodes/comments', {
        showId: Number(id),
        episodeId: null,
        text: commentText,
      });
      setComments((prev) => [response.data, ...prev]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Group episodes by season
  const episodesBySeason = episodes.reduce((acc, episode) => {
    const season = episode.season;
    if (!acc[season]) acc[season] = [];
    acc[season].push(episode);
    return acc;
  }, {} as Record<number, Episode[]>);

  if (loading) return <p style={{ padding: '24px' }}>Loading...</p>;
  if (!show) return <p style={{ padding: '24px' }}>Show not found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '16px', cursor: 'pointer' }}>
        ← Back
      </button>

      {/* Show header */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
        {show.image?.original && (
          <img
            src={show.image.original}
            alt={show.name}
            style={{ width: '150px', borderRadius: '8px' }}
          />
        )}
        <div>
          <h1 style={{ margin: '0 0 8px' }}>{show.name}</h1>
          <p style={{ margin: '0 0 8px', color: '#666' }}>{show.genres.join(', ')}</p>
          <p style={{ margin: 0, color: '#666' }}>
            {show.premiered ? `Premiered: ${show.premiered}` : ''}
          </p>
          {show.summary && (
            <div
              style={{ marginTop: '12px', fontSize: '14px' }}
              dangerouslySetInnerHTML={{ __html: show.summary }}
            />
          )}
        </div>
      </div>

      {/* List of episodes grouped by season */}
      <h2>Episodes</h2>
      {Object.entries(episodesBySeason).map(([season, eps]) => (
        <div key={season} style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 8px', color: '#444' }}>Season {season}</h3>
          {eps.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              onWatchedChange={handleWatchedChange}
            />
          ))}
        </div>
      ))}

      {/* Comments section */}
      <h2>Comments</h2>
      <div style={{ marginBottom: '16px' }}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment about the show..."
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            marginTop: '8px',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          >
          Comment
        </button>
      </div>

      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            padding: '12px',
            marginBottom: '8px',
            border: '1px solid #eee',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
          }}
        >
          <p style={{ margin: '0 0 4px' }}>{comment.text}</p>
            <span style={{ fontSize: '12px', color: '#999' }}>
            {new Date(comment.createdAt).toLocaleString('en-US')}
          </span>
        </div>
      ))}
    </div>
  );
}