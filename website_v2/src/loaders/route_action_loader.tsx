const RouteActionLoader = () => {
  return (
    <div className="w-screen h-screen fixed left-0 right-0 top-0 bottom-0 z-50 flex items-center justify-center bg-[rgba(255,255,255,0.5)]">
      <button className="btn btn-primary btn-square loading"></button>
    </div>
  );
};

export {RouteActionLoader};
