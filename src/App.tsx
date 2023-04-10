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
import { useLoadScreen } from "./contexts/LoadScreen";

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
  const { setIsLoading } = useLoadScreen();
  useEffect(() => {
    if (location.pathname === "/about") {
      html.classList.add("scroll");
    } else {
      html.classList.remove("scroll");
    }
    onclick = (e) => {
      if (e.button !== 0) return;
      const element = (e.target as HTMLLinkElement).closest("a");
      if (!element) return;
      setIsLoading(true, 500);
    };
  }, []);

  return (
    <>
      <div className="App fixed z-10 flex flex-grow flex-col items-center justify-between overflow-y-scroll">
        <Header />
        <Routes>
          <Route path="/" element={<PageWithLayout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="about" element={<About />} />
            <Route path="credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}
