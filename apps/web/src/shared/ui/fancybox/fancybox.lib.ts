import * as Fancyapps from '@fancyapps/ui';
const { Fancybox } = Fancyapps;

export { Fancybox };

export type FancyboxOptionsType = ConstructorParameters<typeof Fancybox>[1];
