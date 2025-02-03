import React from 'react';
import { observer } from 'mobx-react-lite';
import { NearEarthObject } from '../../types/nasa';

interface Props {
  neo: NearEarthObject;
  onToggleFavorite: (id: string) => void;
}

const NEOCard: React.FC<Props> = observer(({ neo, onToggleFavorite }) => {
  return (
    <div className="neo-card">
      <h3>{neo.name}</h3>
      <p>
        Diameter:{' '}
        {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
      </p>
      <p>Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      <button
        className={`favorite-button ${neo.isFavorite ? 'favorite-active' : ''}`}
        onClick={() => onToggleFavorite(neo.id)}
        aria-label="favorite"
      >
        ⭐
      </button>
    </div>
  );
});

export default NEOCard;
