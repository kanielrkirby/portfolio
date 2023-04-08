import { Routes, Route, Outlet, Navigate } from "react-router-dom";
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

function PageWithLayout() {
  const title = useTitle();
  return (
    <div className="flex h-fit w-full flex-grow flex-col items-center">
      <h1 className="mb-4 text-2xl">{title}</h1>
      <Outlet />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <div className="App fixed flex flex-col justify-between overflow-y-auto [scrollbar-width:auto] [-webkit-scrollbar-width:auto]">
      <Header />
      <Routes>
        <Route index element={<Navigate to="/projects" replace />} />
        <Route
          path="projects/:id"
          element={<Project className="h-full min-h-fit" />}
        />
        <Route path="/" element={<PageWithLayout />}>
          <Route
            path="projects"
            element={<Projects className="h-full min-h-fit" />}
          />
          <Route
            path="about"
            element={<About className="h-full min-h-fit" />}
          />
          <Route
            path="credits"
            element={<Credits className="h-full min-h-fit" />}
          />
          <Route path="*" element={<NotFound className="h-full min-h-fit" />} />
        </Route>
        <Route
          path="/contact"
          element={<Contact className="h-full min-h-fit" />}
        />
      </Routes>
      <Background className="fixed top-0 -z-10 h-full w-full bg-black" />
    </div>
  );
}
