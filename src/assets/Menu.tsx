import { SVGProps } from "react";

export default function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="0"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="50" y="97" width="400" height="60" rx="24" fill="white" />
      <rect x="50" y="220" width="400" height="60" rx="24" fill="white" />
      <rect x="50" y="343" width="400" height="60" rx="24" fill="white" />
    </svg>
  );
}
