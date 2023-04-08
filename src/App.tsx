import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background/Main";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Credits from "./pages/Credits";
import useTitle from "./hooks/useTitle";
import { useEffect } from "react";

const html = document.querySelector("html")!;

function PageWithLayout() {
  const title = useTitle();
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/about") {
      html.classList.add("scroll");
    } else {
      html.classList.remove("scroll");
    }
  }, [location]);

  return (
    <>
      <div className="App fixed z-10 flex flex-grow flex-col items-center justify-between overflow-y-scroll">
        <Header />
        <Routes>
          <Route index element={<Navigate to="/projects" replace />} />
          <Route path="/" element={<PageWithLayout />}>
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="about" element={<About />} />
            <Route path="credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Background className="fixed top-0 left-0 right-0 bottom-0 m-auto h-screen w-screen bg-black" />
    </>
  );
}
