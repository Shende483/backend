// razorpay.service.ts
import BaseService from "../api-base/BaseService";

interface PaymentDetails {
  subscriptionId: string;
  amount: number;
  currency: string;
}

interface VerifyPaymentDetails {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  amount: number;
  subscriptionId: string;
}

interface SubscriptionUpdateDetails {
  status: string;
  subscriptionId: string;
}

export default class RazorpayService extends BaseService {
  static async createPayment(paymentDetails: PaymentDetails) {
    return BaseService.post<{
      amount: number;
      currency: string;
      orderId: string;
      subscriptionId: string;
      email?: string;
      mobile?: string;
    }>('payment-details/create-payment', paymentDetails);
  }

  static async verifyPayment(verifyDetails: VerifyPaymentDetails) {
    return BaseService.post('payment-details/verify-payment', verifyDetails);
  }

  static async updateSubscriptionStatus(updateDetails: SubscriptionUpdateDetails) {
    return BaseService.post('subscription-details/update', updateDetails);
  }
}