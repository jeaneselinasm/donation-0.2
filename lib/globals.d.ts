
export {};

declare global {
  interface MidtransSnapResult{
    transaction_id : string;
    order_id : string;
    payment_type : string;
    gross_amount : string;
    transaction_status : string;
    fraud_status? : string;
    settlement_time? : string;
    va_numbers? : {bank : string, va_number : string} [];
  }

  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          language?: string;
          onSuccess?: (result : MidtransSnapResult) => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        }
      ) => void;
      hide?: () => void;
    };
  }
}
