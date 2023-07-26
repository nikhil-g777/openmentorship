type Props = {
  heading: string;
  provides: {
    [key: string]: boolean;
  };
};
const Provides = ({heading, provides}: Props) => {
  const provideKeys = Object.entries(provides).map(key => key[0]);
  return (
    <>
      <h2 className="font-semibold my-2">{heading}</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
        {provideKeys && provideKeys.length
          ? provideKeys.map(provide => (
              <span key={provide} className="kbd w-fit">
                {provide}
              </span>
            ))
          : null}
      </div>
    </>
  );
};
export {Provides};