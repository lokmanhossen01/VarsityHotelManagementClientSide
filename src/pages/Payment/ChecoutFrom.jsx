import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import useAxiosSec from '../../Hooks/useAxiosSec';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { useLocation, useNavigate } from 'react-router-dom';

const ChecoutFrom = ({ price, badge }) => {
  const naviget = useNavigate();
  const location = useLocation();
  const axiosSec = useAxiosSec();
  const { userDta } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loding, setLoding] = useState(false);
  //   const [suc, setSuc] = useState({});
  //   console.log(price);
  useEffect(() => {
    axiosSec.post('/create-payment-intent', { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSec, price]);
  //   console.log(clientSecret);

  // Post Payment History
  const { mutateAsync } = useMutation({
    mutationFn: async (payment) => {
      const { data } = await axiosSec.post('/payments', payment);
      console.log(data);
    },
    onSuccess: () => {
      toast.success('Payment Saved!');
      setLoding(false);
      naviget(location?.state ? location.state : '/');
    },
    onError: () => {
      setLoding(false);
    },
  });

  const handleSubmit = async (event) => {
    setLoding(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setLoding(false);
      console.log('[error]', error);
      setErr(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setErr('');
    }
    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: userDta?.email || null,
            name: userDta?.displayName || null,
            phone: userDta?.photoURL || null,
          },
        },
      }
    );
    if (cardError) {
      setLoding(false);
      console.log(cardError.message);
      Swal.fire({
        title: 'Opppppss !',
        text: `Couldn't make your payment. Problem: ${cardError.message}`,
        icon: 'error',
      });
    } else {
      console.log('Payment Intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        const payment = {
          name: userDta?.displayName,
          email: userDta?.email,
          ammount: price,
          transactionId: paymentIntent.id,
          badge: badge,
        };
        Swal.fire({
          title: 'Succeeded',
          text: `You have made the payment successfully. Your transaction ID: ${paymentIntent.id}`,
          icon: 'success',
        });
        await mutateAsync(payment);
        event.reset();
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="text-center">
      <CardElement
        className="font-semibold"
        options={{
          style: {
            base: {
              fontSize: '22px',
              color: '#fff',
              '::placeholder': {
                color: '#e2e8f0',
              },
            },
            invalid: {
              color: '#ef4444',
            },
          },
        }}
      />
      {loding ? (
        <p className="py-2 w-36 mx-auto block duration-300 cursor-progress rounded-md bg-pClr text-slate-100 mt-14">
          <ImSpinner9 className="animate-spin text-2xl mx-auto" />
        </p>
      ) : (
        <button
          className="bg-pClr w-36 py-2 rounded-md font-bold text-white mt-14 mx-auto "
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </button>
      )}
      <p className="pt-7 pb-4 text-red-400">{err}</p>
    </form>
  );
};

export default ChecoutFrom;
ChecoutFrom.propTypes = {
  price: PropTypes.number,
  badge: PropTypes.string,
};
