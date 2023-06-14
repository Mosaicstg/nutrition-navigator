// Components
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MapFilters from './components/MapFilters.tsx';

// Hooks
import useAllPrograms from './hooks/useAllPrograms.tsx';

// CSS
import 'leaflet/dist/leaflet.css';
import './App.scss';

const App = () => {
  const { state, dispatch } = useAllPrograms();
  const { filteredPrograms } = state;

  return (
    <div className={'nutrition-navigator__map'}>
      <MapFilters {...{ state, dispatch }} />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 500 }}
        attributionControl={false}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}"
          accessToken={
            'pk.eyJ1IjoibW9zYWljc2VydmljZXMiLCJhIjoiY2w4ZGkzaTRmMDUzMzNwbnZ3cGw3N2t6MSJ9.Zbkp1mgAgfzBcmVhr4GG4A'
          }
        />
        {filteredPrograms?.map((program, index) => {
          return (
            <Marker
              key={index}
              position={[program.latitude, program.longitude]}
            />
          );
        })}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
