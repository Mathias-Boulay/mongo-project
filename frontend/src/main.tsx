import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SubmitFormPage } from './pages/submitForm';
import { CreateFormPage } from './pages/createForm';
import { MetricsFormPage } from './pages/metricsForm';
import { ViewSubmittedFormPage } from './pages/viewSubmittedForm';

const router = createBrowserRouter([
  {
    path: '/:id/submit',
    element: <SubmitFormPage />,
  },
  {
    path: '/',
    element: <CreateFormPage />,
  },
  {
    path: '/:id/metrics',
    element: <MetricsFormPage />,
  },
  {
    path: '/:formId/:answerId',
    element: <ViewSubmittedFormPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
