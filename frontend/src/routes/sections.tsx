import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from '../theme/styles';
import { DashboardLayout } from '../pages/layouts/dashboard';

export const HomePage = lazy(() => import('../pages/layouts/dashboard/sections/section-dashboard/view/home'));
export const BlogPage = lazy(() => import('../pages/layouts/dashboard/sections/blog/view/blog'));
export const SubscriptionPage = lazy(() => import('../pages/layouts/dashboard/sections/broker/SubscriptionPage'));
export const SignInPage = lazy(() => import('../pages/layouts/auth/sign-in'));
export const SignUpPage = lazy(() => import('../pages/layouts/auth/sign-up'));
export const ProfileUpdate = lazy(() => import('../pages/layouts/auth/profile-update'));
export const ForgetPassword = lazy(() => import('../pages/layouts/auth/forget-password'));
export const ProductsPage = lazy(() => import('../pages/layouts/dashboard/sections/product/products'));
export const ConnectBrokerPage = lazy(() => import('../pages/layouts/dashboard/sections/broker/ConnectBrokerPage'));
export const MarketTypeDetails = lazy(
  () => import('../Admin/component/marketType/MarketTypeDetails')
);
export const BrokerDetails = lazy(
  () => import('../Admin/component/brokermanagement/BrokerManagementDetails')
);
export const PlanManage = lazy(() => import('../Admin/component/plan/PlanForm'));
export const TradingRule = lazy(() => import('../Admin/component/tradingrule/TradingRule'));

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'subscription', element: <SubscriptionPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'broker', element: <ConnectBrokerPage /> },
        { path: 'admin/marketdetails', element: <MarketTypeDetails /> },
        { path: 'admin/brokerdetails', element: <BrokerDetails /> },
        { path: 'admin/plan', element: <PlanManage /> },
        { path: 'admin/tradingrule', element: <TradingRule /> },
      ],
    },
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/profile',
      element: <ProfileUpdate />,
    },
    {
      path: '/forget-password',
      element: <ForgetPassword />,
    },

  ]);
}
