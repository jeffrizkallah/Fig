import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-dark py-16">
      <Container>
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="space-y-4">
            <Logo dark />
            <p className="text-text-on-dark-muted text-sm max-w-xs">
              Helping companies digitise, modernise, and build systems that
              drive efficiency and growth.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-heading text-sm font-semibold text-text-on-dark mb-4">
                Navigate
              </h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-text-on-dark-muted hover:text-text-on-dark transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-text-on-dark mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-text-on-dark-muted hover:text-text-on-dark transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-dark">
          <p className="text-text-on-dark-muted text-xs">
            &copy; {new Date().getFullYear()} Fig. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
