import { toast } from 'components/Alerts/Alert';

export const handleGlobalError = (error: unknown) => {
  if (error instanceof Error) {
    toast({
      message: `Error: ${error.message}`,
      toastId: `errorId`,
    });
  } else {
    toast({
      message: 'An unexpected error occurred.',
      toastId: `errorId`,
    });
  }
};