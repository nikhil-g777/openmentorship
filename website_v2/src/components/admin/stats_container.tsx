const StatsContainer = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full flex flex-col h-32 card bg-base-300 rounded-box items-center justify-center gap-2">
          <p className="text-5xl font-semibold">19</p>
          <span>Total number of mentors</span>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="w-full flex flex-col h-32 card bg-base-300 rounded-box items-center justify-center gap-2">
          <p className="text-5xl font-semibold">21</p>
          <span>Total number of mentees</span>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="w-full flex flex-col h-32 card bg-base-300 rounded-box items-center justify-center gap-2">
          <p className="text-5xl font-semibold">15</p>
          <span>Active sessions</span>
        </div>
      </div>
    </div>
  );
};

export {StatsContainer};
