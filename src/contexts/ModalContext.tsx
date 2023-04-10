import { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useLocal from "../hooks/useLocal";

interface ContextI {
  setModalOpen: (modal: boolean) => void;
}

export const ModalContext = createContext({} as ContextI);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const { get, toggle } = useLocal();

  function handleModalOpen(modal: boolean) {
    if (modal) {
      setHidden(false);
      setTimeout(() => {
        setModalOpen(true);
      }, 0);
    } else {
      setModalOpen(false);
      setTimeout(() => {
        setHidden(true);
      }, 300);
    }
  }

  useEffect(() => {
    onkeydown = ({ key }) => {
      if (key === "Escape") {
        handleModalOpen(false);
      }
    };
  }, []);

  return (
    <ModalContext.Provider value={{ setModalOpen: handleModalOpen }}>
      {children}
      {ReactDOM.createPortal(
        <>
          {!hidden && (
            <div
              className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out selection:bg-red-300 ${
                modalOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div
                className={`relative flex h-[30rem] w-[40rem] max-w-[90%] flex-col items-center gap-4 rounded-md bg-white p-16 transition-all duration-300 ease-in-out ${
                  modalOpen ? "" : "translate-y-full"
                }`}
              >
                <button
                  className="group absolute top-0 right-0 z-10 h-fit w-fit cursor-pointer p-5"
                  onClick={() => handleModalOpen(false)}
                >
                  <div className="relative block cursor-pointer text-black transition-all duration-150 after:pointer-events-none after:absolute after:top-0 after:bottom-0 after:right-0 after:left-0 after:-z-10 after:m-auto after:scale-x-0 after:scale-y-100 after:rounded-sm after:bg-black after:p-0 after:transition-all after:duration-150 after:content-[''] group-hover:text-red-500 group-hover:after:scale-x-[125%] group-hover:after:scale-y-[125%]">
                    Close
                  </div>
                </button>
                <h2 className="text-black">Settings</h2>
                <div className="flex h-full w-full justify-center gap-24">
                  <div className="flex h-full flex-col justify-around">
                    <label className="text-black" htmlFor="background">
                      Moving Background
                    </label>
                    <label className="text-black" htmlFor="invert-background">
                      Invert Background
                    </label>
                    <label className="text-black" htmlFor="dev">
                      Developer Mode
                    </label>
                  </div>
                  <div className="flex h-full flex-col justify-around">
                    <input
                      id="background"
                      name="background"
                      type="checkbox"
                      defaultChecked={get("background")}
                      onClick={() => toggle("background")}
                    />
                    <input
                      id="invert-background"
                      name="invert-background"
                      type="checkbox"
                      defaultChecked={get("invert-background")}
                      onClick={() => toggle("invert-background")}
                    />
                    <input
                      id="dev"
                      name="dev"
                      type="checkbox"
                      defaultChecked={get("dev")}
                      onClick={() => toggle("dev")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>,
        document.getElementById("modal-root") as HTMLElement,
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
