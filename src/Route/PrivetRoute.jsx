import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../Hooks/useAuth';
import Loding from '../pages/Loding/Loding';
import { PropTypes } from 'prop-types';

const PrivetRoute = ({ children }) => {
  const { userDta, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Loding />;
  }
  if (userDta) {
    return children;
  }
  return <Navigate to={'/login'} state={location.pathname} />;
};

export default PrivetRoute;
PrivetRoute.propTypes = {
  children: PropTypes.node,
};
