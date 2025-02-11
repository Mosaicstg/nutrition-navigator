import { Popup } from 'react-leaflet';
import useProgramTypes from '../hooks/useProgramTypes/useProgramTypes.tsx';
import { Program } from '../hooks/useAllPrograms/types.ts';
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
              {program['quick-view-headline']
                ? program['quick-view-headline']
                : program.name}
            </h3>
            {program.address ? (
              <p className="nutrition-navigator__marker-address">
                {program.address}
              </p>
            ) : null}
          </div>
          {program['not-open-to-public'] ? (
            <div className="nutrition-navigator__marker-not-open-to-public">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 15C7.03167 15 6.12167 14.8162 5.27 14.4487C4.41833 14.0812 3.6775 13.5825 3.0475 12.9525C2.4175 12.3225 1.91875 11.5817 1.55125 10.73C1.18375 9.87833 1 8.96833 1 8C1 7.03167 1.18375 6.12167 1.55125 5.27C1.91875 4.41833 2.4175 3.6775 3.0475 3.0475C3.6775 2.4175 4.41833 1.91875 5.27 1.55125C6.12167 1.18375 7.03167 1 8 1C8.96833 1 9.87833 1.18375 10.73 1.55125C11.5817 1.91875 12.3225 2.4175 12.9525 3.0475C13.5825 3.6775 14.0812 4.41833 14.4487 5.27C14.8162 6.12167 15 7.03167 15 8C15 8.96833 14.8162 9.87833 14.4487 10.73C14.0812 11.5817 13.5825 12.3225 12.9525 12.9525C12.3225 13.5825 11.5817 14.0812 10.73 14.4487C9.87833 14.8162 8.96833 15 8 15ZM8 13.6C8.63 13.6 9.23667 13.4979 9.82 13.2937C10.4033 13.0896 10.94 12.795 11.43 12.41L3.59 4.57C3.205 5.06 2.91042 5.59667 2.70625 6.18C2.50208 6.76333 2.4 7.37 2.4 8C2.4 9.56333 2.9425 10.8875 4.0275 11.9725C5.1125 13.0575 6.43667 13.6 8 13.6ZM12.41 11.43C12.795 10.94 13.0896 10.4033 13.2937 9.82C13.4979 9.23667 13.6 8.63 13.6 8C13.6 6.43667 13.0575 5.1125 11.9725 4.0275C10.8875 2.9425 9.56333 2.4 8 2.4C7.37 2.4 6.76333 2.50208 6.18 2.70625C5.59667 2.91042 5.06 3.205 4.57 3.59L12.41 11.43Z"
                  fill="#FF3232"
                  stroke="#FF3232"
                />
              </svg>
              Not Open to the Public
            </div>
          ) : null}
          {program.description ? (
            <div
              className="nutrition-navigator__marker-description"
              dangerouslySetInnerHTML={{ __html: decode(program.description) }}
            ></div>
          ) : null}
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
