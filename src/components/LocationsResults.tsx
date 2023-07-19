import { Program } from '../hooks/useAllPrograms/types.ts';

export type LocationsResultsProps = {
  locations: Program[];
};

const LocationsResults = (props: LocationsResultsProps) => {
  const { locations } = props;

  if (locations && !locations.length) {
    return (
      <div className="nutrition-navigator__map-results">
        <h4>No results found.</h4>
      </div>
    );
  }

  return (
    <div className="nutrition-navigator__map-results">
      <h4>{locations.length} locations match your search.</h4>
    </div>
  );
};

export default LocationsResults;
