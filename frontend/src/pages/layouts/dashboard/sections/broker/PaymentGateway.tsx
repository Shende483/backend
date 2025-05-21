import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { Box, Alert, CircularProgress } from '@mui/material';

import RazorpayService from '../../../../../Services/api-services/razorpay-gatway-service';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentGatewayProps {
  subscriptionId: string;
  amount: number;
}

export default function PaymentGateway({ subscriptionId, amount }: PaymentGatewayProps) {
  const [loading, setLoading] = useState(true);
  const [, setRazorpayLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const initiatePayment = useCallback(async () => {
    try {
      setLoading(true);
      const orderResponse = await RazorpayService.createPayment({
        subscriptionId,
        amount,
        currency: 'INR'
      });

        // Add validation for the response data
    if (!orderResponse?.data) {
      throw new Error('Invalid payment response from server');
    }
    if (!orderResponse.data.amount || !orderResponse.data.currency || !orderResponse.data.orderId) {
      throw new Error('Required payment details missing in response');
    }
      const options = {
        key: 'rzp_test_eOk7fWZMLa686r',
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        order_id: orderResponse.data.orderId,
        name: 'RiskDefender',
        description: 'Payment for subscription',
        handler: async (response: any) => {
          try {
            await RazorpayService.verifyPayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              amount: orderResponse.data.amount,
              subscriptionId: orderResponse.data.subscriptionId,
            });
            setStatusMessage('Payment successful!');

            try {
              await RazorpayService.updateSubscriptionStatus({
                status: 'active',
                subscriptionId: orderResponse.data.subscriptionId,
              });
            } catch (error: any) {
              setStatusMessage('Failed to update subscription.');
            }
            navigate('/broker');
          } catch (error) {
            setStatusMessage('Payment verification failed');
          }
        },
        prefill: {
          email: orderResponse.data.email,
          contact: orderResponse.data.mobile,
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', async (response: any) => {
        setStatusMessage(`Payment failed: ${response.error.description}`);

        try {
          await RazorpayService.updateSubscriptionStatus({
            status: 'inactive',
            subscriptionId: orderResponse.data.subscriptionId,
          });
        } catch (error: any) {
          setStatusMessage('Failed to update subscription.');
        }
      });
      rzp.open();
    } catch (error: any) {
      // Enhanced error handling
      let errorMessage = 'Payment initialization failed';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data?.message || 
                      `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server';
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || 'Unknown error occurred';
      }
      
      setStatusMessage(`Payment initialization failed: ${errorMessage}`);
      console.error('Payment initialization error:', error);
    } finally {
      setLoading(false);
    }
  }, [subscriptionId, amount, navigate]);

  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
        initiatePayment();
      };
      script.onerror = () => setStatusMessage('Failed to load payment gateway. Please refresh.');
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadRazorpay();
    } else {
      setRazorpayLoaded(true);
      initiatePayment();
    }
  }, [initiatePayment]);

  return (
    <Box>
      {loading && <CircularProgress size={24} />}
      {statusMessage && (
        <Alert severity={statusMessage.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {statusMessage}
        </Alert>
      )}
    </Box>
  );
}