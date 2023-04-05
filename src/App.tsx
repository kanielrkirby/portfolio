import { Routes, Route, Outlet } from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background/Main";

function PageWithNavbar() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Background className="fixed top-0 -z-10 h-full w-full bg-black" />
    </>
  );
}

export default function App() {
  return (
    <div className="App relative flex flex-col justify-between">
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
