import type { Show } from '../types';

interface Props {
  show: Show;
  onClick: (show: Show) => void;
}

/**
 * Reusable card to display a show in the results list.
 */
export function ShowCard({ show, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(show)}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px',
        marginBottom: '8px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#fff',
      }}
    >
      {show.image?.medium ? (
        <img
          src={show.image.medium}
          alt={show.name}
          style={{ width: '60px', height: '84px', objectFit: 'cover', borderRadius: '4px' }}
        />
      ) : (
        <div style={{ width: '60px', height: '84px', backgroundColor: '#eee', borderRadius: '4px' }} />
      )}
      <div>
        <h3 style={{ margin: '0 0 4px' }}>{show.name}</h3>
        <p style={{ margin: '0 0 4px', color: '#666', fontSize: '14px' }}>
          {show.premiered ? show.premiered.substring(0, 4) : 'Unknown year'}
        </p>
        <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>
          {show.genres.join(', ')}
        </p>
      </div>
    </div>
  );
}