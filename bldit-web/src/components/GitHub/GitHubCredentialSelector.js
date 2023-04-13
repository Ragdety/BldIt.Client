import React, {useEffect, useState} from 'react';
import routes from "../../api/bldit/routes";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";

const GitHubCredentialSelector = ({onSelectedCred}) => {
  const axiosPrivate = useAxiosPrivate();
  
  const [gitHubCredentials, setGitHubCredentials] = useState([]);
  const [selectedGitHubCredential, setSelectedGitHubCredential] = useState("");
  
  //Credential creation
  const [gitHubAccessToken, setGitHubAccessToken] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  
  //Get credentials when component mounts
  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get(routes.github.credentials.getGitHubCredentials);
      console.log("User GitHub Credentials: ", response.data);
      if (response.status === 200) {
        setGitHubCredentials(response.data);
      }
      else {
        setError(`Error getting GitHub credentials: ${response.data.detail}`);
      }
    })();
    
    return () => {
      console.log("GitHub Credential Selector unmounted");
    }
  }, []);
  
  const createGitHubCred = () => {
    axiosPrivate.post(routes.github.credentials.createGitHubCredential, {
      personalAccessToken: gitHubAccessToken,
      description: description,
    }).then((response) => {
      console.log("GitHub Credential created successfully");
      setGitHubCredentials([...gitHubCredentials, response.data]);
      setSelectedGitHubCredential(response.data.id);
      onSelectedCred(response.data.id);
    }).catch((error) => {
      console.log("GitHub Credential creation failed");
      setError(error.response.data.detail);
    });
  }

  //This function is used IF the user selects a credential from the dropdown
  const handleGitHubCredentialIdChange = (e) => {
    setSelectedGitHubCredential(e.target.value);
    onSelectedCred(e.target.value);
  }

  const credentialSelector = () => {
    return (
      <div className = "form-group" >
        <label className="jc-label">Github Credential ID</label>
        <select id="gitHubCredentialId"
                value={selectedGitHubCredential}
                onChange={handleGitHubCredentialIdChange}
                className="jc-input">
          <option value="" disabled>Select a GitHub Credential</option>
          {gitHubCredentials.map((credential) => {
            return (
              <option value={credential.id}>
                {credential.id}
                {credential.description && ` - ${credential.description}`}
              </option>
            );
          }
          )}
        </select>
      </div>
    );
  }

  function handleAccessTokenChange(e) {
    setGitHubAccessToken(e.target.value);
  }
  
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  
  const credentialCreator = () => {
    return (
      <div className = "form-group" >
        <h3 className="text-white">Create a GitHub Credential</h3>
        <label className="jc-label">GitHub Access Token</label>
        <input type="text"
               id="gitHubAccessToken"
               value={gitHubAccessToken}
               onChange={handleAccessTokenChange}
               className="jc-input"/>
        <br/>
        <label className="jc-label">Description</label>
        <br/>
        <input type="text"
               id="description"
               value={description}
               onChange={handleDescriptionChange}
               className="jc-input"/>
        <Button variant="contained" onClick={createGitHubCred}>Create Credential</Button>
      </div>
    );
  }
  
  return (
    <>
      {/*If user has credentials, render the selector, otherwise, let use create credential then select it */}
      {gitHubCredentials.length > 0 ? (credentialSelector()) : credentialCreator()}
      {error && <div className="text-red-500 text-center pt-2">{error}</div>}
    </>
  );
};

export default GitHubCredentialSelector;