import { Children, cloneElement, isValidElement, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { Link, useNavigate, type LinkProps } from "react-router-dom";

// Router link that, like the original site's wouter links, lets a component
// child (e.g. a Button) act as the link itself instead of nesting a button
// inside an <a>, which is invalid HTML.
export function SiteLink({ to, children, ...rest }: LinkProps & { children?: ReactNode }) {
  const navigate = useNavigate();
  const only = Children.count(children) === 1 ? Children.only(children) : null;
  if (only && isValidElement(only) && typeof only.type !== "string") {
    const child = only as ReactElement<{ onClick?: (e: MouseEvent) => void; role?: string }>;
    return cloneElement(child, {
      role: child.props.role ?? "link",
      onClick: (e: MouseEvent) => {
        child.props.onClick?.(e);
        if (!e.defaultPrevented) navigate(to);
      },
    });
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
