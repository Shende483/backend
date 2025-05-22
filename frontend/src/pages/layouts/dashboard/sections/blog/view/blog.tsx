import { Helmet } from 'react-helmet-async';

import { BlogView } from './blog-view';
import { CONFIG } from '../../../../../../config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <BlogView />
    </>
  );
}
