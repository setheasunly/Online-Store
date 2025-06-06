interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

interface PaymentResponse {
  transactionId: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

class PaymentService {
  async processPayment(details: PaymentDetails): Promise<PaymentResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation
    if (details.cardNumber.length !== 16) {
      throw new Error('Invalid card number');
    }

    if (!details.expiryDate.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
      throw new Error('Invalid expiry date');
    }

    if (details.cvv.length !== 3) {
      throw new Error('Invalid CVV');
    }

    // Simulate success/failure (90% success rate)
    if (Math.random() > 0.9) {
      throw new Error('Payment failed. Please try again.');
    }

    return {
      transactionId: `tr_${Math.random().toString(36).substr(2, 9)}`,
      status: 'success',
      timestamp: new Date().toISOString()
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
}

export const paymentService = new PaymentService(); 