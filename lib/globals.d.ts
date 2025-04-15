export {};

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          language?: string;
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        }
      ) => void;
      hide?: () => void;
    };
  }
}
