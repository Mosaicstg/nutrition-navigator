import { Program } from '../schema.ts';
import { Popup } from 'react-leaflet';
import useProgramTypes from '../hooks/useProgramTypes.tsx';

const MarkerPopUp = (props: { program: Program }) => {
  const { program } = props;
  const { data, status } = useProgramTypes();

  return (
    <Popup>
      <div className={'nutrition-navigator__marker-content-wrap'}>
        <h4 className={'nutrition-navigator__heading--h4'}>{program.name}</h4>
        {program.address ? (
          <p className="nutrition-navigator__marker-address">
            {program.address}
          </p>
        ) : null}
        <div className={'nutrition-navigator__marker-content-footer-wrap'}>
          <div className={'nutrition-navigator__marker-program-types'}>
            {status === 'success' &&
              data
                .filter((programType) => {
                  const { 'program-types': programProgramType } = program;

                  return programProgramType.includes(programType.slug);
                })
                .map((programType) => {
                  const { meta } = programType;

                  return (
                    <span
                      className={'nutrition-navigator__marker-program-icon'}
                    >
                      <img
                        src={meta.icon}
                        alt={`Icon image for ${programType.name} program type`}
                      />
                    </span>
                  );
                })}
          </div>
          <div className={'nutrition-navigator__marker-link-wrap'}>
            <a href={program.url} className={'nutrition-navigator__button'}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default MarkerPopUp;
