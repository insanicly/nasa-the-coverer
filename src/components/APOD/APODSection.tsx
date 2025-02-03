import React from 'react';
import { observer } from 'mobx-react-lite';
import { APOD } from '../../types/nasa';

interface Props {
  apod: APOD | null;
}

const APODSection: React.FC<Props> = observer(({ apod }) => {
  if (!apod) return null;

  return (
    <section className="apod-section">
      <h2>Astronomy Picture of the Day</h2>
      <div className="apod-container">
        <h3>{apod.title}</h3>
        <img src={apod.url} alt={apod.title} />
        <p>{apod.explanation}</p>
      </div>
    </section>
  );
});

export default APODSection;
