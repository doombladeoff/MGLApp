import Svg, { Defs, Ellipse, FeBlend, FeFlood, FeGaussianBlur, Filter, G, LinearGradient, Path, Stop } from "react-native-svg";

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

export const DefaultIcon: React.FC<IconProps> = ({ width = 188, height = 173 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="-10 -10 208 173"
      fill="none"
    >
      <G filter="url(#filter0_f_5084_4898)">
        <Ellipse
          cx="56.374"
          cy="77.9406"
          rx="32.2295"
          ry="51.1553"
          fill="url(#paint0_linear_5084_4898)"
        />
      </G>

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M111.383 19.312C136.898 14.6984 161.322 31.6423 165.936 57.1572L171.513 88.0019C175.961 112.603 151.109 132.179 128.234 122.092C116.854 117.074 103.58 119.296 94.4551 127.747L93.4828 128.647C74.2404 146.467 42.9055 135.998 38.239 110.19L36.832 102.409L32.9961 81.1951C28.3826 55.6802 45.3265 31.2563 70.8414 26.6427L111.383 19.312ZM93.1122 76.4224C90.9678 76.9534 89.6598 79.1222 90.1907 81.2665C90.7217 83.4109 92.8905 84.7189 95.0348 84.188L108.624 80.8233C110.769 80.2923 112.077 78.1236 111.546 75.9792C111.015 73.8348 108.846 72.5268 106.702 73.0578L93.1122 76.4224ZM116.956 61.7794C116.425 59.635 117.733 57.4662 119.877 56.9353L133.467 53.5706C135.611 53.0397 137.78 54.3476 138.311 56.492C138.842 58.6364 137.534 60.8052 135.389 61.3361L121.8 64.7008C119.655 65.2318 117.487 63.9238 116.956 61.7794ZM61.6586 69.5103C59.5142 70.0412 58.2063 72.21 58.7372 74.3544C59.2681 76.4988 61.4369 77.8067 63.5813 77.2758L77.1709 73.9111C79.3153 73.3802 80.6233 71.2114 80.0923 69.067C79.5614 66.9226 77.3926 65.6147 75.2482 66.1456L61.6586 69.5103Z"
        fill="url(#paint1_linear_5084_4898)"
      />

      <Defs>
        <Filter
          id="filter0_f_5084_4898"
          x="0.144531"
          y="2.78528"
          width="112.459"
          height="150.311"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_5084_4898" />
        </Filter>

        <LinearGradient
          id="paint0_linear_5084_4898"
          x1="75.7364"
          y1="105.067"
          x2="46.2286"
          y2="-23.9859"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4D5254" stopOpacity="0" />
          <Stop offset="1" stopColor="#6B7073" />
        </LinearGradient>

        <LinearGradient
          id="paint1_linear_5084_4898"
          x1="108.758"
          y1="119.781"
          x2="69.1107"
          y2="45.6481"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#686868" />
          <Stop offset="1" stopColor="#9F9F9F" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
