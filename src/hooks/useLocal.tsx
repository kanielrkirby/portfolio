import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContext";

export default function useLocal() {
  return useContext(LocalContext);
}
