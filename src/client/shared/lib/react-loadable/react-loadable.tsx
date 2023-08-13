import { ComponentType, FC, Suspense, lazy } from 'react';
import { waitForReadyTranslations } from '@client/shared/lib/i18n/async';

export function loadable<Props, T extends ComponentType>(
  factory: () => Promise<{ default: T }>,
) {
  const Component = lazy(async () => {
    const component = await factory();
    await waitForReadyTranslations();

    return component;
  });

  const LazyComponent: FC<Props> = (props: any) => {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponent;
}
