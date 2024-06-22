import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loding from '../pages/Loding/Loding';
import useAdmin from '../Hooks/useAdmin';
import { PropTypes } from 'prop-types';

const PrivetDashboard = ({ children }) => {
  const { userDta, isLoading } = useAuth();
  const isAdmin = useAdmin();
  if (isLoading) {
    return <Loding />;
  }
  if (userDta && isAdmin) {
    return children;
  }
  return <Navigate to={'/'} />;
};

export default PrivetDashboard;
PrivetDashboard.propTypes = {
  children: PropTypes.node,
};
