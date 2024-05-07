import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { CaretDownIcon } from "@radix-ui/react-icons";
import "./styles.css";
import HeaderListItem from "./HeaderListItem";

const StaticsHeader = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="https://github.com/radix-ui"
          >
            Գլխավոր
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Քաղաքացիություն <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 3" }}>
                <NavigationMenu.Link asChild>
                  <a className="Callout" href="/">
                    <svg
                      aria-hidden
                      width="38"
                      height="38"
                      viewBox="0 0 25 25"
                      fill="white"
                    >
                      <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                      <path d="M12 0H4V8H12V0Z"></path>
                      <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                    </svg>
                    <div className="CalloutHeading">WP</div>
                    <p className="CalloutText">React components.</p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <HeaderListItem href="/statistics/work-permit" title="Շնորհում">
                Քաղաքացիություն շնորհված
              </HeaderListItem>
              <HeaderListItem href="/colors" title="Դադարեցում">
                Դադարեցված
              </HeaderListItem>
              <HeaderListItem
                href="https://icons.radix-ui.com/"
                title="Ճանաչում"
              >
                Քաղաքացի ճանաչված
              </HeaderListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Ապաստան <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <HeaderListItem
                title="Դիմումներ"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Որոշումներ"
                href="/primitives/docs/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </HeaderListItem>
              <HeaderListItem
                title="Փախստականներ"
                href="/primitives/docs/guides/styling"
              >
                Unstyled and compatible with any styling solution.
              </HeaderListItem>
              <HeaderListItem
                title="Animation"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </HeaderListItem>
              <HeaderListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </HeaderListItem>
              <HeaderListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </HeaderListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Կացություն <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <HeaderListItem
                title="ԺԿԿ"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="ՄԿԿ"
                href="/primitives/docs/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </HeaderListItem>
              <HeaderListItem
                title="ՀԿԿ"
                href="/primitives/docs/guides/styling"
              >
                Unstyled and compatible with any styling solution.
              </HeaderListItem>
              <HeaderListItem title="WP" href="/statistics/work-permit">
                Use CSS keyframes or any animation library of your choice.
              </HeaderListItem>
              <HeaderListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </HeaderListItem>
              <HeaderListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </HeaderListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Սահմանահատում <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <HeaderListItem
                title="Ըստ երկրների"
                href="/primitives/docs/overview/introduction"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Ըստ տեսակի"
                href="/primitives/docs/overview/getting-started"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </HeaderListItem>
              <HeaderListItem
                title="Ըստ ժամանակահատվածի"
                href="/primitives/docs/guides/styling"
              >
                Unstyled and compatible with any styling solution.
              </HeaderListItem>
              <HeaderListItem
                title="Animation"
                href="/primitives/docs/guides/animation"
              >
                Use CSS keyframes or any animation library of your choice.
              </HeaderListItem>
              <HeaderListItem
                title="Accessibility"
                href="/primitives/docs/overview/accessibility"
              >
                Tested in a range of browsers and assistive technologies.
              </HeaderListItem>
              <HeaderListItem
                title="Releases"
                href="/primitives/docs/overview/releases"
              >
                Radix Primitives releases and their changelogs.
              </HeaderListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="https://github.com/radix-ui"
          >
            Գործարքներ
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

export default StaticsHeader;
