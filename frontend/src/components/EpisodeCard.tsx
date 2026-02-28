import type { Episode } from '../types';

interface Props {
  episode: Episode;
  onWatchedChange: (episode: Episode, watched: boolean) => void;
}

/**
 * Reusable card to display an episode with a watched checkbox.
 */
export function EpisodeCard({ episode, onWatchedChange }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px',
        marginBottom: '6px',
        border: '1px solid #eee',
        borderRadius: '6px',
        backgroundColor: episode.watched ? '#f0fff0' : '#fff',
      }}
    >
      <input
        type="checkbox"
        checked={episode.watched}
        onChange={(e) => onWatchedChange(episode, e.target.checked)}
        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
      />
      <div>
        <span style={{ fontWeight: 500 }}>
          {episode.season}x{String(episode.number).padStart(2, '0')} — {episode.name}
        </span>
      </div>
    </div>
  );
}