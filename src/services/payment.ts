interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

export const paymentService = {
  async processPayment(details: PaymentDetails): Promise<PaymentResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (details.cardNumber.length !== 16) {
      throw new Error('Invalid card number');
    }

    if (details.cvv.length !== 3) {
      throw new Error('Invalid CVV');
    }

    // Mock successful payment
    return {
      success: true,
      transactionId: `TR-${Math.random().toString(36).substr(2, 9)}`,
      message: 'Payment processed successfully',
    };
  },

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      transactionId,
      message: 'Payment verified successfully',
    };
  },
}; 