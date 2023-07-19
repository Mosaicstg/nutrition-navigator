// Components
import MapFilters from './components/MapFilters.tsx';
import Loading from './components/Loading.tsx';
import Map from './components/Map.tsx';

// Hooks
import useAllPrograms from './hooks/useAllPrograms/useAllPrograms.tsx';

// CSS
import 'leaflet/dist/leaflet.css';
import './App.scss';
import LocationsResults from './components/LocationsResults.tsx';

const App = () => {
  const [state, dispatch] = useAllPrograms();
  const { filteredPrograms, programs } = state;

  return (
    <div className={'nutrition-navigator__map'}>
      <MapFilters {...{ state, dispatch }} />
      {programs.length === 0 ? (
        <Loading />
      ) : (
        <>
          <LocationsResults locations={filteredPrograms} />
          <Map filteredLocations={filteredPrograms} />
        </>
      )}
    </div>
  );
};

export default App;
