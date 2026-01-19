import Navbar from "./NavBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <header className="bg-indigo-500 text-white p-4 shadow-md">
        <Navbar />
      </header> 

      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-slate-100 text-slate-700 p-4 text-center">
        © 2026 Tribbu
      </footer>
    </div>
  );
}

export default Layout