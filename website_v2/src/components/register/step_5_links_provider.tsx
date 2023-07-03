"use client";

const LinksProvider = () => {
  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      {/* Twitter */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="twitter" className="text-base md:text-lg md:w-1/6">
          Twitter
        </label>
        <input
          className="input input-bordered w-full"
          id="twitter"
          placeholder="https://"
          name="twitter"
        />
      </div>
      {/* Medium */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="medium" className="text-base md:text-lg md:w-1/6">
          Medium
        </label>
        <input
          className="input input-bordered w-full"
          id="medium"
          placeholder="https://"
          name="medium"
        />
      </div>
      {/* Behance */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="behance" className="text-base md:text-lg md:w-1/6">
          Behance
        </label>
        <input
          className="input input-bordered w-full"
          id="behance"
          placeholder="https://"
          name="behance"
        />
      </div>
      {/* GitHub */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="github" className="text-base md:text-lg md:w-1/6">
          GitHub
        </label>
        <input
          className="input input-bordered w-full"
          id="github"
          placeholder="https://"
          name="github"
        />
      </div>
      {/* Portfolio */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="portfolio" className="text-base md:text-lg md:w-1/6">
          Portfolio
        </label>
        <input
          className="input input-bordered w-full"
          id="portfolio"
          placeholder="https://"
          name="portfolio"
        />
      </div>
      {/* Other */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="other" className="text-base md:text-lg md:w-1/6">
          Other
        </label>
        <input
          className="input input-bordered w-full"
          id="other"
          placeholder="https://"
          name="other"
        />
      </div>
    </div>
  );
};

export {LinksProvider};
