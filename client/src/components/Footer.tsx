export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 Eddy Out</p>
      </div>
      <div className="footer-right">
        <p className="photo-credits">
          Photo credits:{" "}
          <a
            href="https://unsplash.com/@_dillongroves"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dillon Groves
          </a>{" "}
          &{" "}
          <a
            href="https://unsplash.com/@baileyzindel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bailey Zindel
          </a>
        </p>
      </div>
    </footer>
  );
}
