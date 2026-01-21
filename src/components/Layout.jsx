import Navbar from "./NavBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <header className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-2xl sticky top-0 z-auto py-3">
        <Navbar />
      </header> 

      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-slate-100 text-slate-700 p-4 text-center">       
        <a className="text-indigo-500 " href="/about"> ABOUT TRIBBU </a><br /> ©2026 Tribbu 
      </footer>
    </div>
  );
}

export default Layout