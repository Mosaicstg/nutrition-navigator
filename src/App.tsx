import './App.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import usePrograms from './hooks/usePrograms.tsx';
import MapFilters from './components/MapFilters.tsx';
import { useState } from 'react';
import { Filters } from './types.ts';

const Loading = () => {
  return null;
};

const defaultFilters: Filters = {
  'program-types': [],
  venues: [],
  audiences: [],
  'organization-name': '',
  address: ''
};

const App = () => {
  const [filters, setFilters] = useState(() => defaultFilters);
  const { data: allPrograms, status: allProgramsStatus } = usePrograms(filters);

  if ('loading' === allProgramsStatus) {
    return <Loading />;
  }

  return (
    <div className={'nutrition-navigator__map'}>
      <MapFilters {...{ filters, setFilters }} />
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
        {allPrograms?.map((program, index) => {
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
