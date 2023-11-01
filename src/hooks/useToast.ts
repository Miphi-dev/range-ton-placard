import { useContext } from 'react';
import { ToastContext } from '@/provider/ToastProvider';

const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export default useToast;
