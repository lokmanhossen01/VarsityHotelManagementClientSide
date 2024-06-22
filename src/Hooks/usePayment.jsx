import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSec from './useAxiosSec';

const usePayment = () => {
  const { userDta } = useAuth();
  const axioss = useAxiosSec();
  const { data: isPay = false } = useQuery({
    queryKey: [userDta?.email, 'isPay'],
    queryFn: async () => {
      const { data } = await axioss.get(`paymentssCnf/${userDta.email}`);
      return data;
    },
  });
  return isPay;
};

export default usePayment;
