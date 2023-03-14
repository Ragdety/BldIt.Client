import React from 'react';
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { UilSetting,  UilLightbulb, UilPen, UilTrashAlt } from '@iconscout/react-unicons'
import Footer from "../Footer";
import JobCard from "./JobCard";
import BuildList from "../Builds/BuildList";

const SideNav = () => {
  const des = "This job will run a build on the master branch of the bldit-web repository. " +
    "This job will run a build on the master branch of the bldit-web repository." +
    "This job will run a build on the master branch of the bldit-web repository."
  
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
  
  const startBuild = (e) => {
    e.preventDefault();
    console.log("Starting build...");
  }
  
  const deleteJob = (e) => {
    e.preventDefault();
    //TODO: Add a confirmation dialog
    //TODO: Redirect to Jobs page
  }

  return (
    <>
      <Navbar/>
      <aside className="fixed left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 list-none">
            <li className="none">
              <Link href="#"
                 className="flex items-center p-2 text-base font-normal text-gray-900 
                 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline">

                <UilSetting className="w-6 h-6"/>
                <span className="ml-3 font-medium">Configure</span>
              </Link>
            </li>
            <li className="none">
              <span className="flex items-center p-2 text-base font-normal text-gray-900 
                               rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline cursor-pointer"
                    onClick={(e) => startBuild(e)}>

                <UilLightbulb className="w-6 h-6"/>
                <span className="mx-4 font-medium">Build</span>
              </span>
            </li>
            <li className="none">
              <Link className="flex items-center p-2 text-base font-normal text-gray-900 
                 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline">

                <UilPen className="w-6 h-6"/>
                <span className="mx-4 font-medium">Edit Job</span>
              </Link>
            </li>
            <li className="none">
              <span className="flex items-center p-2 text-base font-normal text-gray-900 
                               rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline cursor-pointer">

                <UilTrashAlt className="w-6 h-6"/>
              <span className="mx-4 font-medium">Delete Job</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="pb-6">
          <JobCard name="SomeJob" description={des} jobType="Freestyle" lastBuild="98"/>
        </div>
        <div>
          <BuildList builds={builds}/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SideNav;