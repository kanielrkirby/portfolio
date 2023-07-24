import { atom } from "nanostores";

export const $flipped = atom(false);

export const toggle = () => $flipped.set(!$flipped.get());
