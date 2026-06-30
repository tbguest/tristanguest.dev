import Link from "next/link";
import { ContentLayout } from "../ContentLayout/ContentLayout";

interface Props {
  title: string;
  pdfPath: string;
  description: string;
}

export function DocumentPage({ title, pdfPath, description }: Props) {
  const downloadName = `${title.toLowerCase().replace(/\s+/g, "-")}.pdf`;

  return (
    <ContentLayout title={title} description={description}>
      <p>
        <Link href={pdfPath} download={downloadName} className="text-anchor">
          Download PDF
        </Link>
        {" · "}
        <Link href={pdfPath} target="_blank" className="text-anchor">
          Open in new tab
        </Link>
      </p>
      <iframe
        src={pdfPath}
        title={title}
        className="w-full rounded-lg shadow-lg border-0"
        style={{ height: "80vh", minHeight: "600px" }}
      />
    </ContentLayout>
  );
}
