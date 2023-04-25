import React, { useState, useEffect } from "react";
import FileSaver from "file-saver";
import useBldItPrivate from "../hooks/useAxiosPrivate";
import routes from "../api/bldit/routes";

function ArtifactsList({projectId, jobName, buildNumber}) {
  const [fileList, setFileList] = useState([]);
  
  const bldItPrivate = useBldItPrivate();

  useEffect(() => {
    bldItPrivate.get(routes.builds.getBuildArtifacts
      .replace("{projectId}", projectId)
      .replace("{jobName}", jobName)
      .replace("{buildNumber}", buildNumber))
      .then((response) => {
        setFileList(response.data);
      }
    ).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleFileClick = (artifactName) => {
    bldItPrivate
      .get(routes.builds.getBuildArtifact
          .replace("{projectId}", projectId)
          .replace("{jobName}", jobName)
          .replace("{buildNumber}", buildNumber)
          .replace("{artifactName}", artifactName)
        , { responseType: "blob" })
      .then((response) => {
        FileSaver.saveAs(response.data, artifactName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      Build Artifacts
      <br/>
      {fileList.map((fileName) => (
        <a key={fileName} onClick={() => handleFileClick(fileName)} className="cursor-pointer">
          {fileName}
        </a>
      ))}
    </div>
  );
}

export default ArtifactsList;