import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './navigators/MainNavigator';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './translations';
import { storage } from '@/storage';
import ToastProvider from '@/provider/ToastProvider';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider storage={storage}>
      <ToastProvider>
        <MainNavigator />
      </ToastProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
