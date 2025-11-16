import Svg, { Defs, Ellipse, FeBlend, FeFlood, FeGaussianBlur, Filter, G, LinearGradient, Path, Stop } from "react-native-svg";

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

export const AngryIcon: React.FC<IconProps> = ({ color = '#FF4400', width = 188, height = 173 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="10 -5 188 173"
      fill="none"
    >
      <G filter="url(#filter0_f_4987_18171)">
        <Ellipse
          cx="62.6949"
          cy="86.636"
          rx="10.3843"
          ry="33.7053"
          fill="url(#paint0_linear_4987_18171)"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.02 29.3152C149.201 24.9429 172.347 41.0006 176.719 65.1811L182.005 94.4127C186.221 117.727 162.668 136.28 140.989 126.72C130.205 121.965 117.625 124.07 108.977 132.079L108.056 132.932C89.8197 149.82 60.1236 139.899 55.7012 115.441L54.3677 108.066L50.7325 87.9619C46.3602 63.7814 62.418 40.6348 86.5985 36.2625L125.02 29.3152ZM125.966 95.3319C128.687 94.9269 130.564 92.3932 130.159 89.6726C129.02 82.0178 121.891 76.736 114.236 77.8753C106.581 79.0146 101.3 86.1437 102.439 93.7985C102.844 96.5191 105.378 98.3963 108.098 97.9914L125.966 95.3319ZM78.7825 69.9735L78.0932 69.4953C76.4177 68.333 74.1172 68.749 72.9549 70.4244C71.7926 72.0999 72.2085 74.4004 73.884 75.5627L74.5733 76.0409C76.6294 77.4673 77.1399 80.2905 75.7135 82.3466L75.2351 83.0363C74.0727 84.7117 74.4887 87.0122 76.1642 88.1745C77.8396 89.3369 80.1401 88.9209 81.3024 87.2454L81.7807 86.556C83.2072 84.4997 86.0305 83.9892 88.0868 85.4157L88.7766 85.8943C90.4521 87.0566 92.7525 86.6407 93.9149 84.9652C95.0772 83.2897 94.6612 80.9893 92.9858 79.8269L92.296 79.3484L78.7825 69.9735ZM150.283 56.4368C151.959 57.5991 152.375 59.8996 151.212 61.575L150.734 62.2645C149.308 64.3208 149.818 67.1441 151.874 68.5706L152.564 69.0491C154.24 70.2115 154.656 72.5119 153.493 74.1874C152.331 75.8629 150.03 76.2788 148.355 75.1165L147.665 74.6379C145.609 73.2114 142.786 73.7219 141.359 75.7782L140.881 76.4676C139.718 78.1431 137.418 78.5591 135.743 77.3967C134.067 76.2344 133.651 73.9339 134.813 72.2585L135.292 71.5688L144.667 58.0555L145.145 57.3659C146.307 55.6904 148.608 55.2744 150.283 56.4368Z"
        fill="url(#paint1_linear_4987_18171)"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M128.012 12.8618L152.388 39.7777C137.495 44.57 110.722 52.3442 122.776 45.1016C134.829 37.8591 131.289 20.5906 128.012 12.8618Z"
        fill="url(#paint2_linear_4987_18171)"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M79.4262 22.5151L66.3156 56.3786C81.9368 55.5155 109.717 53.1789 95.8686 50.737C82.0201 48.2952 79.1368 30.905 79.4262 22.5151Z"
        fill="url(#paint3_linear_4987_18171)"
        stroke={color}
        strokeWidth={1.5}
      />
      <Defs>
        <Filter
          id="filter0_f_4987_18171"
          x="0.310547"
          y="0.930664"
          width="124.77"
          height="171.411"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="26" result="effect1_foregroundBlur_4987_18171" />
        </Filter>

        <LinearGradient
          id="paint0_linear_4987_18171"
          x1="62.6734"
          y1="113.41"
          x2="88.9623"
          y2="93.0384"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.463219" stopColor="#FF0000" />
          <Stop offset="1" stopColor="#FF6B00" />
        </LinearGradient>

        <LinearGradient
          id="paint1_linear_4987_18171"
          x1="122.532"
          y1="124.53"
          x2="84.9583"
          y2="54.2739"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.463219" stopColor="#FF0000" />
          <Stop offset="1" stopColor="#FF6B00" />
        </LinearGradient>

        <LinearGradient
          id="paint2_linear_4987_18171"
          x1="131.293"
          y1="15.0465"
          x2="144.011"
          y2="38.9217"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.619792" stopColor="#FF2727" />
          <Stop offset="1" stopColor="#FF3427" stopOpacity="0" />
        </LinearGradient>

        <LinearGradient
          id="paint3_linear_4987_18171"
          x1="77.146"
          y1="25.7306"
          x2="73.829"
          y2="52.5777"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.619792" stopColor="#FF2727" />
          <Stop offset="1" stopColor="#FF3427" stopOpacity="0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
