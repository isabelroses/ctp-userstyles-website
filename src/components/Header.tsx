import Link from "next/link";

function Header({ route }: { readonly route: string }) {
  return (
    <header className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-text">
          Catppuccin Userstyles
        </h1>
        <nav className="flex flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className={`text-xl text-sapphire ${route === "/" ? "underline" : ""}`}
          >
            home
          </Link>
          <Link
            href="/maintainers"
            className={`text-xl text-sapphire ${route === "/maintainers" ? "underline" : ""}`}
          >
            maintainers
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;
