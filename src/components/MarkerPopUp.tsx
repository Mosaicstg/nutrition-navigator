import { Popup } from 'react-leaflet';
import { useProgramTypes } from '~/hooks/useProgramTypes/useProgramTypes.tsx';
import { Program } from '~/hooks/useAllPrograms/types.ts';
import { decode } from 'html-entities';

const MarkerPopUp = (props: { program: Program }) => {
  const { program } = props;
  const { data, status } = useProgramTypes();

  return (
    <Popup>
      <div className={'nutrition-navigator__marker-content-wrap'}>
        <div className="nutrition-navigator__marker-content-column">
          <div className="nutrition-navigator__marker-headline-wrap">
            <h3
              className={
                'nutrition-navigator__heading--h4 nutrition-navigator__text-capital-case'
              }
            >
              {program.name}
            </h3>
            {program.address ? (
              <p className="nutrition-navigator__marker-address">
                {program.address}
              </p>
            ) : null}
          </div>
          <div className="nutrition-navigator__marker-program-types">
            {status === 'success' &&
              data
                .filter((programType) => {
                  const { 'program-types': programProgramType } = program;

                  return programProgramType.includes(programType.slug);
                })
                .map((programType) => {
                  const { meta, id, name } = programType;

                  return (
                    <span
                      key={id}
                      className={'nutrition-navigator__marker-program-type'}
                    >
                      {meta.icon ? (
                        <img
                          className="nutrition-navigator__marker-program-icon"
                          src={meta.icon}
                          alt={`Icon image for ${programType.name} program type`}
                        />
                      ) : null}
                      {decode(name)}
                    </span>
                  );
                })}
          </div>
        </div>
        <div className="nutrition-navigator__marker-link-wrap">
          <a
            href={program.url}
            className={
              'nutrition-navigator__button nutrition-navigator__button--purple'
            }
          >
            Learn More
          </a>
        </div>
      </div>
    </Popup>
  );
};

export default MarkerPopUp;
