import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { CaretDownIcon } from "@radix-ui/react-icons";
import "./styles.css";
import HeaderListItem from "./HeaderListItem";
import { WP_TYPE_MAPS } from "../../pages/WorkPermitStats/WorkPermitStats.constants";

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
              <li style={{ gridRow: "span 4" }}>
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

              <HeaderListItem
                href="/statistics/citizenship?type=total"
                title="Ընդհանուր"
              >
                Ընդհանուր
              </HeaderListItem>
              <HeaderListItem href="/statistics/citizenship" title="Շնորհում">
                Քաղաքացիություն շնորհված
              </HeaderListItem>
              <HeaderListItem href="/statistics/citizenship" title="Դադարեցում">
                Դադարեցված
              </HeaderListItem>
              <HeaderListItem href="/statistics/citizenship" title="Ճանաչում">
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
              <li style={{ gridRow: "span 4" }}>
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
              <HeaderListItem
                title="Ընդհանուր"
                href="/statistics/apastan-total"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Դիմումներ"
                href="/statistics/apastan-applications"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Որոշումներ"
                href="/statistics/apastan-decisions"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </HeaderListItem>
              <HeaderListItem
                title="Ըստ տարիների"
                href="/statistics/apastan-years"
              >
                Unstyled and compatible with any styling solution.
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
                title="WP-official"
                href="/statistics/work-permit-official"
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
              <HeaderListItem
                title="Ընդհանուր"
                href="/statistics/total-bordercross"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Ըստ երկրների"
                href="/statistics/country-bordercross"
              >
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Ըստ ժամանակահատվածի"
                href="/statistics/period-bordercross"
              >
                Unstyled and compatible with any styling solution.
              </HeaderListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="/statistics/deals"
          >
            Գործարքներ
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="/statistics/profile"
          >
            Պրոֆիլ
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Հաշվետվություններ
            <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <HeaderListItem
                title="Ընդհանուր"
                href="/statistics/reports?report_type=total"
              >
                Unstyled and compatible with any styling solution.
              </HeaderListItem>
              <HeaderListItem title="Ապաստան" href="/statistics/asylum-reports">
                Build high-quality, accessible design systems and web apps.
              </HeaderListItem>
              <HeaderListItem
                title="Քաղաքացիություն"
                href="/statistics/reports?report_type=citizenship"
              >
                A quick tutorial to get you up and running with Radix
                Primitives.
              </HeaderListItem>
              <HeaderListItem title="Կացություն" href="/statistics/wp-reports">
                Unstyled and compatible with any styling solution.
              </HeaderListItem>
              <HeaderListItem
                title="Սահմանահատում"
                href="/statistics/reports?report_type=bordercross"
              >
                Use CSS keyframes or any animation library of your choice.
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
