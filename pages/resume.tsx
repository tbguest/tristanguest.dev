export default function Resume() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <iframe
        src="/documents/resume.pdf"
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: "block",
        }}
      ></iframe>
    </div>
  );
}
