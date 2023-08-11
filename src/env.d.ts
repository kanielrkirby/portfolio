/// <reference types="@astrojs/client-image" />
import Swup from "swup";

declare module "*.webp";
declare module "*.svg";
declare global {
  interface Window {
    swup: Swup;
  }
}
