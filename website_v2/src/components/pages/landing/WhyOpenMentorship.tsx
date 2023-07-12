const WhyOpenMentorship = () => {
  return (
    <div className="w-full bg-[#F5F3F8] px-4">
      <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
        {/* Heading */}
        <div className="md:pb-24">
          <h1
            className="text-xl sm:text-heading sm:leading-normal font-bold"
            data-cy="landing-whyOpenMentorship-h1"
          >
            Why Open Mentorship?
          </h1>
        </div>
        {/* Points */}
        <div className="flex flex-col pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-20">
            <div className="my-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Career advice
              </h2>
              <h3 className="text-base">
                Receive career advice from professionals with years of
                experience in your field, and feel confident moving forward in
                your career.
              </h3>
            </div>
            <div className="my-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Expand your network
              </h2>
              <h3 className="text-base">
                Both mentees and mentors can grow their network and make lasting
                connections that could benefit both careers in the future.
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-20">
            <div className="my-4">
              <h2 className="text-lg sm:text-xl font-semibold">
                Strengthen your work
              </h2>
              <h3 className="text-base">
                Share your portfolio, work examples, or resume with mentors and
                receive constructive feedback before your next big interview.
              </h3>
            </div>
            <div className="my-4">
              <h2 className="text-lg sm:text-xl font-semibold">Guidance</h2>
              <h3 className="text-base">
                Explore your career options and feel empowered making your next
                decision towards your dream job.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyOpenMentorship;
