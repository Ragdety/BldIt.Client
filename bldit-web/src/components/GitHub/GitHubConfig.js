import React, {useEffect, useState} from 'react';
import routes from "../../api/bldit/routes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GitHubCredentialSelector from "./GitHubCredentialSelector";

const GitHubConfig = ({onStepDataChange}) => {
  const axiosPrivate = useAxiosPrivate();
  
  //This will be set by the GitHubCredentialSelector component
  const [gitHubCredential, setGitHubCredential] = useState("");
  
  const [selectedRepo, setSelectedRepo] = useState({
    id: "",
    name: "",
    url: "",
    branch: "",
  });
  
  const [availableRepos, setAvailableRepos] = useState([]);
  
  const [error, setError] = useState("");
  
  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get(routes.github.repos.getGitHubRepos
        .replace("{credentialId}", gitHubCredential));
      if (response.status === 200) {
        setAvailableRepos(response.data.content);
      }
      else {
        setError(`Error getting GitHub repos: ${response.data.detail}`);
      }
      
      return () => {
        console.log("GitHub Config unmounted");
      }
    })();
  }, [gitHubCredential]);

  const handleRepoSelection = (event) => {
    const selectedRepoName = event.target.value;
    console.log(selectedRepoName);

    //Find the repo with the selected name
    const selectedRepo = availableRepos.find(
      (repo) => repo.name === selectedRepoName
    );
    
    //This should not happen, but just in case:
    if (selectedRepo === undefined) {
      console.error("Selected repo is undefined");
      setError("An error occurred while selecting the repo. Please try again.");
      
      //If the user selected the "Select a repo" option, clear the selectedRepo state
      setSelectedRepo({
        id: "",
        name: "",
        url: "",
        branch: "",
      });
      
      //Clear the step data
      onStepDataChange('repoId', "");
      onStepDataChange('repoName', "");
      onStepDataChange('repoUrl', "");
      onStepDataChange('repoBranch', "");
      
      return;
    }
    
    setError("");
    console.log(selectedRepo);

    //This maps the entire Repo object into our selectedRepo state
    setSelectedRepo(selectedRepo);
    
    //This maps the individual properties of the Repo object into our step data (which will be the one sent to the API)
    //When we click "Next" in our stepper.
    onStepDataChange('repoId', selectedRepo.id);
    onStepDataChange('repoName', selectedRepo.name);
    onStepDataChange('repoUrl', selectedRepo.url);
    onStepDataChange('repoBranch', selectedRepo.branch);
    onStepDataChange('gitHubCredentialId', gitHubCredential);
  }

  return (
    <>
      {/*If git cred is empty, render GitCredSelector, this will either 
        create a cred and select it, or let user select cred*/}
      {gitHubCredential === "" ? (
        <>
          <GitHubCredentialSelector onSelectedCred={setGitHubCredential} />
        </>
      ) : (
        <div className="form-group">
          <label className="jc-label">Select a repo</label>
          <select
            className="jc-select"
            value={selectedRepo.name}
            onChange={handleRepoSelection}
          >
            <option value="" disabled>Select a repo</option>
            {availableRepos.map((repo) => (
              <option key={repo.id} value={repo.name}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
        )}
      {error && <div className="text-red-500 text-center pt-2">{error}</div>}
    </>
  );
};

export default GitHubConfig;