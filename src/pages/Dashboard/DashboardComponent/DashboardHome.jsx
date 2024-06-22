import useAdmin from '../../../Hooks/useAdmin';
import AdminProfile from './AdminProfile';
import ProfileUSer from './ProfileUSer';

const DashboardHome = () => {
  const admin = useAdmin();
  return <div>{admin ? <AdminProfile /> : <ProfileUSer />}</div>;
};

export default DashboardHome;
