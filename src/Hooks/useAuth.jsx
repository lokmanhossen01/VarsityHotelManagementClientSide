import { useContext } from 'react';
import { ContextAuth } from '../provider/Provider';

const useAuth = () => {
  const auth = useContext(ContextAuth);
  return auth;
};

export default useAuth;
