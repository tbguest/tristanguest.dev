import classNames from "classnames";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { spaceGrotesk } from "../../../fonts";
import { Layout } from "../Layout/Layout";
import { Breadcrumb, BreadcrumbItem } from "../../ui/Breadcrumb";
import { WizardHomeLink } from "../../WizardHomeLink/WizardHomeLink";

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  portfolioArticle?: boolean;
  breadcrumbLabel?: string;
  showWizardHomeLink?: boolean;
}

export function ContentLayout({
  children,
  title,
  subtitle,
  description,
  portfolioArticle,
  breadcrumbLabel,
  showWizardHomeLink = true,
}: PropsWithChildren & Props) {
  const router = useRouter();
  const segments = router.pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "";

  const breadcrumbItems: BreadcrumbItem[] = portfolioArticle
    ? [
        { label: "~", href: "/" },
        { label: "portfolio", href: "/portfolio" },
        { label: breadcrumbLabel ?? title },
      ]
    : [
        { label: "~", href: "/" },
        { label: lastSegment.replace(/-/g, " ") },
      ];

  return (
    <Layout
      title={`${title} — Tristan Guest`}
      description={description ?? subtitle}
    >
      <section>
        <div
          className={classNames(
            "mb-6",
            showWizardHomeLink && "flex items-center justify-between gap-4",
          )}
        >
          {showWizardHomeLink && <WizardHomeLink />}
          <Breadcrumb
            items={breadcrumbItems}
            className="flex justify-end"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div>
              <h1
                className={classNames([
                  spaceGrotesk.className,
                  "font-black text-3xl mb-1",
                ])}
              >
                {title}
              </h1>
            </div>
            {subtitle && <h2 className="text-gray-500 mb-6">{subtitle}</h2>}
          </div>
          {children}
        </div>
      </section>
    </Layout>
  );
}
