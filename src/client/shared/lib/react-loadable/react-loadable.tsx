import { ComponentType, FC, Suspense, lazy } from 'react';
import { waitForReadyTranslations } from '@client/shared/lib/i18n/async';
import { useProvidedScope } from 'effector-react';
import { Scope } from 'effector';

export function loadable<Props, T extends ComponentType>(
  factory: (scope: Scope | null) => Promise<{ default: T }>,
) {
  const LazyComponent: FC<Props> = (props: any) => {
    const scope = useProvidedScope();

    const Component = lazy(async () => {
      const component = await factory(scope);
      await waitForReadyTranslations();

      return component;
    });

    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };

  return LazyComponent;
}
