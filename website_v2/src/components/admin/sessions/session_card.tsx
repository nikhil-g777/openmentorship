import {SessionData} from "@/types/admin/sessions";
import {SessionProfile} from "./session_profile";

type Props = {
  data: SessionData["sessions"][0];
};

const SessionCard = ({data}: Props) => {
  return (
    <div className="w-full min-w-full pb-5">
      <div className="w-full mt-4 p-4 rounded-md border border-base-300">
        {/* Match Details */}
        <div className="w-full flex flex-wrap gap-4">
          <p className="flex gap-2 truncate">
            <b>Match Date: </b>
            <span>
              {data?.match?.createdAt
                ? new Date(data.match.createdAt).toLocaleDateString()
                : ""}
            </span>
          </p>
          <p className="flex gap-2 truncate">
            <b>Session ID: </b>
            <span>{data?.match?.latestSession}</span>
          </p>
        </div>
        {/* Mentor Card */}
        {data?.match?.mentor ? (
          <SessionProfile data={data?.match?.mentor} />
        ) : null}
        {/* Mentee Card */}
        {data?.match?.mentee ? (
          <SessionProfile data={data?.match?.mentee} />
        ) : null}
      </div>
    </div>
  );
};

export {SessionCard};
