import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

import { SvgColor } from '../../components/svg-color';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Subscribe Plan',
    path: '/subscription',
    icon: <SubscriptionsIcon />,
  },
  {
    title: 'Add Rules',
    path: '/broker',
    icon: icon('ic-user'),
  },
  {
    title: 'Renew Plan',
    path: '/products',
    icon: icon('ic-cart'),
  },
  {
    title: 'Delete Plan',
    path: '/blog',
    icon: icon('ic-blog'),
  },
 
];
