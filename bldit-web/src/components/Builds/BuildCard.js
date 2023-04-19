import React from 'react';
import { UilCheck, UilExclamationOctagon, UilBan, UilClock  } from '@iconscout/react-unicons'
import moment from "moment";

const BuildCard = ({build, style, onClick}) => {
  const getBuildStyle = () => {
    if (build?.result === "Success") {
      return "bg-green-200";
    } else if (build?.result === "Failed") {
      return "bg-red-200";
    } else {
      return "bg-gray-400";
    }
  }
  
  const getBuildIcon = () => {
    if (build?.result === "Success") {
      return <UilCheck className="w-6 h-6 fill-current text-green-700"/>;
    } else if (build?.result === "Failed") {
      return <UilBan className="w-6 h-6 fill-current text-red-700"/>;
    } else {
      return <UilClock className="w-6 h-6 fill-current text-gray-700"/>;
    }
  }
  
  return (
    <div className="flex items-center p-4 bg-white rounded" 
         style={style} 
         onClick={onClick}>
      <div className={`flex flex-shrink-0 items-center justify-center  
                       h-14 w-14 rounded ${getBuildStyle()}`}>
        {getBuildIcon()}
      </div>
      <div className="flex-grow flex flex-col ml-4 ">
        <span className="text-xl font-bold">Build {build?.number}</span>
        <div className="flex items-center justify-between ">
          <span className="text-gray-500">{moment(build?.createdAt).format('DD MMM, YYYY')}</span>
          <span className="text-sm font-semibold ml-2">Status: {build?.status}</span>
        </div>
      </div>
    </div>
  );
};

export default BuildCard;