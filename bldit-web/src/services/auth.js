import {identityClient} from "../api/bldit/bldit-api";
import routes from "../api/bldit/routes";

// No need for async await here since that is taken care of by the useApi hook
const login = (usernameOrEmail, password) => {
  return identityClient.post(routes.identity.login, {
    UserNameOrEmail: usernameOrEmail,
    Password: password
  });
}

const register = (firstName, lastName, email, userName, password) => {
  return identityClient.post(routes.identity.register, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
    password: password
  });
}

export default {
  login,
  register
}