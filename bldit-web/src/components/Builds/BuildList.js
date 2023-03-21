import React from 'react';
import {Button, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const BuildList = () => {
  const builds = [
    {
      status: "Success",
      number: 1,
      date: "2021-05-01 12:00:00",
    },
    {
      status: "Success",
      number: 1,
      date: "2021-05-01 12:00:00",
    }
  ]
  
  
  return (
    <>
    {builds.length ? (
          <table className="w-full p-0 text-sm text-left text-gray-500 border-1 shadow-md sm:rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Build Number
              </th>
              <th scope="col" className="px-6 py-3">
                Date Started
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
            </thead>
            <tbody>
            {builds.map((build) => (
              <tr id={build.id} 
                  className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                  {build.status}
                </th>
                <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                  {build.number}
                </th>
                <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                  {build.date}
                </th>
                <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                  <Link className="cursor-pointer no-underline" to="/Logs">
                    Logs
                  </Link>
                </th>
              </tr>
            ))}
            </tbody>
          </table>
      ) : (
        <div>
          <Typography color="gray">
            No builds yet
          </Typography>
        </div>
      )}
    </>
  )
};

export default BuildList;