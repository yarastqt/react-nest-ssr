import clsx from 'clsx';
import { useUnit } from 'effector-react/scope';
import {
  buildPath,
  RouteParams,
  RouteQuery,
  RouteInstance,
} from 'atomic-router';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react';

import { useRouter } from './router-provider';

export type LinkProps<Params extends RouteParams> = {
  to: RouteInstance<Params> | string;
  params?: Params;
  query?: RouteQuery;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkView = <Params extends RouteParams>(
  props: LinkProps<Params>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const {
    to,
    params,
    query,
    activeClassName,
    inactiveClassName,
    ...linkProps
  } = props;
  if (typeof props.to === 'string') {
    return (
      <NormalLink
        ref={ref}
        href={props.to}
        {...linkProps}
        className={clsx(props.className)}
      />
    );
  }

  // @ts-expect-error (a)
  return <RouteLink ref={ref} {...props} />;
};

const NormalLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  return <a ref={ref} className={props.className} {...props} />;
});

const RouteLinkView = <Params extends RouteParams>(
  props: Exclude<LinkProps<Params>, 'to'> & { to: RouteInstance<Params> },
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const {
    to,
    params,
    query,
    className,
    activeClassName,
    inactiveClassName,
    onClick,
    children,
    ...linkProps
  } = props;

  const router = useRouter();
  const routeObj = router.routes.find((routeObj) => routeObj.route === to);

  if (!routeObj) {
    throw new Error('[RouteLink] Route not found');
  }

  const [isOpened, navigate] = useUnit([routeObj.route.$isOpened, to.navigate]);

  const href = buildPath({
    pathCreator: routeObj.path,
    params: params || {},
    query: query || {},
  });

  return (
    <a
      ref={ref}
      href={href}
      {...linkProps}
      className={clsx(
        className,
        isOpened ? activeClassName : inactiveClassName,
      )}
      onClick={(evt) => {
        evt.preventDefault();
        navigate({
          params: params || ({} as Params),
          query: query || {},
        });
        if (onClick) {
          onClick(evt);
        }
      }}
    >
      {children}
    </a>
  );
};

const RouteLink = forwardRef(RouteLinkView);

export const Link = forwardRef(LinkView) as <Params extends RouteParams>(
  props: LinkProps<Params> & { ref?: ForwardedRef<HTMLAnchorElement> },
) => ReturnType<typeof LinkView>;
