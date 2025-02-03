import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { nasaStore } from './stores/NasaStore';
import APODSection from './components/APOD/APODSection';
import NEOSection from './components/NEO/NEOSection';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import './App.css';

const App: React.FC = observer(() => {
  useEffect(() => {
    nasaStore.fetchAPOD();
    const today = new Date().toISOString().split('T')[0];
    nasaStore.fetchNEO(today, today);
  }, []);

  if (nasaStore.loading) {
    return <LoadingSpinner />;
  }

  if (nasaStore.error) {
    return <ErrorMessage message={nasaStore.error} />;
  }

  return (
    <div className="App">
      <h1>NASA Space Explorer</h1>
      <APODSection apod={nasaStore.apod} />
      <NEOSection
        neoList={nasaStore.neoList}
        onToggleFavorite={nasaStore.toggleFavorite}
      />
    </div>
  );
});

export default App;
