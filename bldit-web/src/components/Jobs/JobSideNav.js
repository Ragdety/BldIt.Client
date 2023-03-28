import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { UilSetting,  UilLightbulb, UilPen, UilTrashAlt } from '@iconscout/react-unicons'
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";
import useApi from "../../hooks/useApi";
import {Alert} from "@material-tailwind/react";

const JobSideNav = ({projectId, jobName}) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailedAlert, setShowFailedAlert] = useState(false);
  
  const buildURL = "http://localhost:5003/api/v1";

  // Api calls
  const bldItPrivate = useBldItPrivate();
  const buildJob = (projId, name) => {
    return bldItPrivate.post(routes.builds.buildJob
      .replace("{projectId}", projId)
      .replace("{jobName}", name));
  }
  const buildJobApi = useApi(buildJob);
  
  const startBuild = async (e, projectId, jobName) => {
    await buildJobApi.request(projectId, jobName);
    
    console.log(buildJobApi);
    
    if (buildJobApi.success === true) {
      setShowSuccessAlert(true);
      return;
    }

    if(buildJobApi.status === 404 ||
       buildJobApi.status === 400 ||
       buildJobApi.status === 500 ) 
    {
      setShowFailedAlert(true);
    }
  }
  
  // useEffect(() => {
  //  
  // }, [buildJobApi.loa]
  
  useEffect(() => {
    const handleCloseSuccessAlert = () => {
      if(showSuccessAlert) {
        //TODO: Find a better way to do this timeout...
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 4000);
      }
    }
    handleCloseSuccessAlert();
  }, [showSuccessAlert]);

  useEffect(() => {
    const handleCloseFailedAlert = () => {
      if(showFailedAlert) {
        setTimeout(() => {
          setShowFailedAlert(false);
        }, 4000);
      }
    }
    handleCloseFailedAlert();
  }, [showFailedAlert]);
  
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
                    onClick={(e) => startBuild(e, projectId, jobName)}>

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
          <Alert color="green"
                 show={showSuccessAlert}
                 dismissible={{
                   onClose: () => setShowSuccessAlert(false),
                 }}
                 className="w-30 cursor-pointer">
            Build started
          </Alert>
          <Alert color="red"
                 show={showFailedAlert}
                 dismissible={{
                   onClose: () => setShowFailedAlert(false),
                 }}
                 className="w-30 cursor-pointer">
            Build failed to start
          </Alert>
        </div>
      </aside>
  );
};

export default JobSideNav;