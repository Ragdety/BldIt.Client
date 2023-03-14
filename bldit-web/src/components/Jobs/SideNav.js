import React from 'react';
import { Link } from "react-router-dom";
import { UilSetting,  UilLightbulb, UilPen, UilTrashAlt } from '@iconscout/react-unicons'

const SideNav = () => {
  
  
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
      <aside className="fixed left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 list-none">
            <li className="none">
              <Link to="/JobConfig"
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
              <Link to="/EditJob"
                    className="flex items-center p-2 text-base font-normal text-gray-900 
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
  );
};

export default SideNav;