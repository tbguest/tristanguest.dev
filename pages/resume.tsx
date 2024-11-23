export default function Resume() {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <iframe
        src="/documents/resume.pdf"
        width="100%"
        height="500px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}
