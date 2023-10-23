"use client";

import {SocialLinks} from "@/types/regsiter";
import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";

type Props = {
  error: SocialLinks;
  handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LinksProvider = ({error, handleChanges}: Props) => {
  const {socialSites, socialLinks} = useRegisterStore();
  const {isEditable} = useProfileSettingsStore();
  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      {socialSites && socialSites.length
        ? socialSites.map(site => (
            <div key={site}>
              <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
                <label
                  htmlFor={site}
                  className="text-base md:text-lg md:w-1/6 capitalize"
                >
                  {site}
                </label>
                <input
                  className={`input input-bordered w-full ${
                    error[site as keyof SocialLinks].length ? "input-error" : ""
                  }`}
                  id={site}
                  placeholder="https://"
                  name={site}
                  // value based on SocialLinks
                  value={socialLinks[site as keyof SocialLinks]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChanges(e)
                  }
                  disabled={!isEditable}
                  data-cy="register-step5-social-links-input"
                />
              </div>
              {/* Error */}
              {error[site as keyof SocialLinks].length ? (
                <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
                  <label className="w-[14%]"></label>
                  <label className="label">
                    <span
                      className="label-text-alt text-error"
                      data-cy="register-step5-social-links-error"
                    >
                      {error[site as keyof SocialLinks]}
                    </span>
                  </label>
                </div>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
};

export {LinksProvider};
