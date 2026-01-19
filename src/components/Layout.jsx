function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="bg-indigo-500 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Tribbu</h1>
      </header>

      {/* Contenido */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-700 p-4 text-center">
        © 2026 Tribbu
      </footer>
    </div>
  );
}

export default Layout