import { useAuth0 } from "@auth0/auth0-react";

const LogButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LogButton;
