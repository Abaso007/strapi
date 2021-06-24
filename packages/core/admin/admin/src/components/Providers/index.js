import React from 'react';
import PropTypes from 'prop-types';
import { QueryClientProvider, QueryClient } from 'react-query';
import { LibraryProvider, StrapiAppProvider } from '@strapi/helper-plugin';
import { Provider } from 'react-redux';
import LanguageProvider from '../LanguageProvider';
import AutoReloadOverlayBlockerProvider from '../AutoReloadOverlayBlockerProvider';
import Notifications from '../Notifications';
import OverlayBlocker from '../OverlayBlocker';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({
  children,
  components,
  fields,
  getAdminInjectedComponents,
  getPlugin,
  localeNames,
  menu,
  messages,
  plugins,
  runHookParallel,
  runHookSeries,
  runHookWaterfall,
  settings,
  store,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StrapiAppProvider
          getAdminInjectedComponents={getAdminInjectedComponents}
          getPlugin={getPlugin}
          menu={menu}
          plugins={plugins}
          runHookParallel={runHookParallel}
          runHookWaterfall={runHookWaterfall}
          runHookSeries={runHookSeries}
          settings={settings}
        >
          <LibraryProvider components={components} fields={fields}>
            <LanguageProvider messages={messages} localeNames={localeNames}>
              <AutoReloadOverlayBlockerProvider>
                <OverlayBlocker>
                  <Notifications>{children}</Notifications>
                </OverlayBlocker>
              </AutoReloadOverlayBlockerProvider>
            </LanguageProvider>
          </LibraryProvider>
        </StrapiAppProvider>
      </Provider>
    </QueryClientProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.element.isRequired,
  components: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  getAdminInjectedComponents: PropTypes.func.isRequired,
  getPlugin: PropTypes.func.isRequired,
  localeNames: PropTypes.objectOf(PropTypes.string).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.string,
      intlLabel: PropTypes.shape({
        id: PropTypes.string.isRequired,
        defaultMessage: PropTypes.string.isRequired,
      }).isRequired,
      permissions: PropTypes.array,
      Component: PropTypes.func,
    })
  ).isRequired,
  messages: PropTypes.object.isRequired,
  plugins: PropTypes.object.isRequired,
  runHookParallel: PropTypes.func.isRequired,
  runHookWaterfall: PropTypes.func.isRequired,
  runHookSeries: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Providers;
