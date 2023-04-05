import { SVGAttributes } from "react";

export default function Logo(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="0"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_20_34)">
        <path
          d="M431.958 50H305.542C302.095 50 298.89 51.7762 297.062 54.7L59.5625 434.7C55.3997 441.361 60.1881 450 68.0425 450H194.458C197.905 450 201.11 448.224 202.938 445.3L440.438 65.3C444.6 58.6395 439.812 50 431.958 50Z"
          fill="white"
        />
        <path
          d="M440.603 434.753C444.709 441.416 439.916 450 432.09 450H267.91C260.084 450 255.291 441.416 259.397 434.753L341.487 301.562C345.393 295.225 354.607 295.225 358.513 301.562L440.603 434.753Z"
          fill="white"
        />
        <mask
          id="mask0_20_34"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="58"
          y="50"
          width="385"
          height="400"
        >
          <path
            d="M431.958 50H305.542C302.095 50 298.89 51.7762 297.062 54.7L59.5625 434.7C55.3997 441.361 60.1881 450 68.0425 450H194.458C197.905 450 201.11 448.224 202.938 445.3L440.438 65.3C444.6 58.6395 439.812 50 431.958 50Z"
            fill="white"
          />
          <path
            d="M440.603 434.753C444.709 441.416 439.916 450 432.09 450H267.91C260.084 450 255.291 441.416 259.397 434.753L341.487 301.562C345.393 295.225 354.607 295.225 358.513 301.562L440.603 434.753Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_20_34)">
          <path
            d="M50 50H263L373 451H160L50 50Z"
            fill="url(#paint0_linear_20_34)"
          />
          <rect
            x="347.478"
            y="287.132"
            width="171.286"
            height="187.079"
            transform="rotate(38.0595 347.478 287.132)"
            fill="url(#paint1_linear_20_34)"
          />
        </g>
        <path
          d="M170 50H60C54.4772 50 50 54.4772 50 60V440C50 445.523 54.4772 450 60 450H170C175.523 450 180 445.523 180 440V60C180 54.4772 175.523 50 170 50Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_20_34"
          x1="156.5"
          y1="451"
          x2="271.5"
          y2="388"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.51" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_20_34"
          x1="472.987"
          y1="443.341"
          x2="429.555"
          y2="414.388"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0.38" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_20_34">
          <rect width="500" height="500" rx="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
