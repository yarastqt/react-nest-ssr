import { ComponentType, FC, Suspense, lazy } from 'react';
import { waitForReadyTranslations } from '../i18n/async';

export function loadable<T extends ComponentType>(
  factory: () => Promise<{ default: T }>,
) {
  const Component = lazy(async () => {
    const component = await factory();
    await waitForReadyTranslations();

    return component;
  });

  const LazyComponent: FC = (props: any) => {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponent;
}
