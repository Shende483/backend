import { Helmet } from 'react-helmet-async';

import { ProductsView } from './view/products-view';
import { CONFIG } from '../../../../../config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
