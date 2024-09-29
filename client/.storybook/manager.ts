import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',

    // Logo
    brandTitle: 'SyncLista',
    brandUrl: 'https://www.synclista.com/',
    brandTarget: '_blank',
  }),
});
