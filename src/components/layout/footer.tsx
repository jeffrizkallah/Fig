import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { NAV_ITEMS } from "@/lib/constants";

const LINKS = [...NAV_ITEMS, { label: "Privacy", href: "/privacy" }];

export function Footer() {
  return (
    <footer className="relative bg-bg-dark pt-10 pb-8">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <Logo dark />
            <p className="text-text-on-dark-muted text-sm">
              Custom software, dashboards and automation for businesses in
              Portugal and across Europe.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-on-dark-muted hover:text-text-on-dark transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-5 border-t border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-text-on-dark-muted text-xs">
            &copy; {new Date().getFullYear()} Fig. All rights reserved.
          </p>
          <a
            href="mailto:hello@fig.agency"
            className="text-xs text-text-on-dark-muted hover:text-text-on-dark transition-colors"
          >
            hello@fig.agency
          </a>
        </div>
      </Container>
    </footer>
  );
}
