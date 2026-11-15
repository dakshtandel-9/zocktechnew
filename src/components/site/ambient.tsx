/** Fixed, slowly drifting orange light + film grain behind every section (makes the glass read as glass). */
export function Ambient() {
  return (
    <div aria-hidden className="ambient">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="noise" />
    </div>
  );
}
