import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { PersonsProvider } from './components/context/persons';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <PersonsProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersonsProvider>
    </QueryClientProvider>
    // </React.StrictMode>
);
