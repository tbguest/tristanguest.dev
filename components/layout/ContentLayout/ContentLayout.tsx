import classNames from "classnames";
import { PropsWithChildren } from "react";
import { spaceGrotesk } from "../../../fonts";
import { Layout } from "../Layout/Layout";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "../../ui/Breadcrumb";

interface Props {
  title: string;
  subtitle?: string;
}

export function ContentLayout({
  children,
  title,
  subtitle,
}: PropsWithChildren & Props) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "";

  const breadcrumbItems = [
    { label: "~", href: "/" },
    { label: lastSegment.replace(/-/g, " ") },
  ];

  return (
    <Layout>
      <section>
        <Breadcrumb items={breadcrumbItems} />
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
