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
    <>
      <Header />
      <div className="flex h-fit flex-col items-center">
        <h1 className="text-2xl">{title}</h1>
        <Outlet />
      </div>
      <Footer />
      <Background className="fixed top-0 -z-10 h-full w-full bg-black" />
    </>
  );
}

export default function App() {
  return (
    <div className="App -z-10 flex flex-col justify-between">
      <Routes>
        <Route index element={<Navigate to="/projects" replace />} />
        <Route path="/" element={<PageWithLayout />}>
          <Route path="projects" element={<Projects className="h-full" />} />
          <Route path="projects/:id" element={<Project className="h-full" />} />
          <Route path="about" element={<About className="h-full" />} />
          <Route path="contact" element={<Contact className="h-full" />} />
          <Route path="credits" element={<Credits className="h-full" />} />
          <Route path="*" element={<NotFound className="h-full" />} />
        </Route>
      </Routes>
    </div>
  );
}
