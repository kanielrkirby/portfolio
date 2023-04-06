import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background/Main";
import { Helmet } from "react-helmet";
import useTitle from "./hooks/useTitle";
import { useEffect, useState } from "react";

function PageWithNavbar() {
  const [preload, setPreload] = useState(true);
  const title = useTitle();

  useEffect(() => {
    const timer = setTimeout(() => setPreload(false), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="flex h-full w-full flex-col items-center">
        <Helmet>
          <title>Portfolio{title ? ` | ${title}` : ""}</title>
        </Helmet>
        <h1 className="mb-6 text-3xl">{title ? title : "Home"}</h1>
        <Outlet />
      </div>
      <Footer className="fixed bottom-0 right-0" />
      {preload ? null : (
        <Background className="fixed top-0 -z-10 h-full w-full bg-black" />
      )}
    </>
  );
}

export default function App() {
  return (
    <div className="App -z-10 flex flex-col justify-between">
      <Routes>
        <Route path="/" element={<PageWithNavbar />}>
          <Route index element={<Home className="h-full" />} />
          <Route path="projects" element={<Projects className="h-full" />} />
          <Route path="about" element={<About className="h-full" />} />
          <Route path="*" element={<NotFound className="h-full" />} />
        </Route>
      </Routes>
    </div>
  );
}
