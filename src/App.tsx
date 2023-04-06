import { Routes, Route, Outlet } from "react-router-dom";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background/Main";
import { Helmet } from "react-helmet";
import useTitle from "./hooks/useTitle";

function PageWithNavbar() {
  const title = useTitle();

  return (
    <>
      <Header />
      <div className="flex h-full w-full flex-col items-center">
        <Helmet>
          <title>Portfolio{title ? ` | ${title}` : ""}</title>
        </Helmet>
        <h1 className="mb-6 text-3xl">{title ? title : "Projects"}</h1>
        <Outlet />
      </div>
      <Footer className="fixed bottom-0 right-0" />
      <Background className="fixed top-0 -z-10 h-full w-full bg-black" />
    </>
  );
}

export default function App() {
  return (
    <div className="App -z-10 flex flex-col justify-between">
      <Routes>
        <Route path="/" element={<PageWithNavbar />}>
          <Route index element={<Projects className="h-full" />} />
          <Route path="about" element={<About className="h-full" />} />
          <Route path="*" element={<NotFound className="h-full" />} />
        </Route>
      </Routes>
    </div>
  );
}
