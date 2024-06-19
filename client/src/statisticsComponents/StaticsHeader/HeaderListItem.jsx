import React from "react";
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "./styles.css";
import { Link } from "react-router-dom";

const HeaderListItem = React.forwardRef(
  ({ className, children, title, href, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          className={classNames("ListItemLink", className)}
          {...props}
          ref={forwardedRef}
          to={href}
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

export default HeaderListItem;
