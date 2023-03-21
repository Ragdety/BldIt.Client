import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Jobs from "../../pages/Jobs";
import { Link } from "react-router-dom";

const JobsBuildList = () => {
  const builds = [
    {
      status: "Success",
      name: "Web Designer",
      number: 1,
      date: "2023-21-03 12:00:00",
    },
    {
      status: "Success",
      name: "Coder",
      number: 1,
      date: "2023-21-03 12:00:00",
    },
  ];

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
                Jobs Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Build Number
              </th>
              <th scope="col" className="px-6 py-3">
                Last Run Date
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {builds.map((build) => (
              <tr
                id={build.id}
                className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {build.status}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link className="cursor-pointer no-underline" to="/Job">
                    {build.name}
                  </Link>
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link className="cursor-pointer no-underline" to="/Build">
                    {build.number}
                  </Link>
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {build.date}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link className="cursor-pointer no-underline" to="/Logs">
                    Logs
                  </Link>
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link className="cursor-pointer no-underline" to="/EditJob">
                    Edit
                  </Link>
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link className="cursor-pointer no-underline">
                    Delete
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <Typography color="gray">No builds yet</Typography>
        </div>
      )}
    </>
  );
};

export default JobsBuildList;
