import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Route';
import AuthProvider from './provider/AuthProvider';
import { NextUIProvider } from "@nextui-org/react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

// tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import Confetti from '../src/hooks/Confetti'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NextUIProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <Toaster />
        </NextUIProvider>
        <Confetti></Confetti>

      </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
