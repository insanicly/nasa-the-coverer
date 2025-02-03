import React from 'react';
import { observer } from 'mobx-react-lite';
import { NearEarthObject } from '../../types/nasa';
import NEOCard from './NEOCard';

interface Props {
  neoList: NearEarthObject[];
  onToggleFavorite: (id: string) => void;
}

const NEOSection: React.FC<Props> = observer(
  ({ neoList, onToggleFavorite }) => {
    return (
      <section className="neo-section">
        <h2>Near Earth Objects</h2>
        <div className="neo-grid">
          {neoList.map((neo) => (
            <NEOCard
              key={neo.id}
              neo={neo}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>
    );
  }
);

export default NEOSection;
