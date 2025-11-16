import Svg, { Defs, Ellipse, FeBlend, FeColorMatrix, FeComposite, FeFlood, FeGaussianBlur, FeOffset, Filter, G, LinearGradient, Path, Stop } from "react-native-svg";

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

export const CalmIcon: React.FC<IconProps> = ({ width = 188, height = 173 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="30 30 208 173"
      fill="none"
    >
      <G filter="url(#filter0_f_4987_18134)">
        <Ellipse
          cx="103.787"
          cy="130.688"
          rx="7.0332"
          ry="33.5651"
          fill="#37F3FF"
        />
      </G>

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M170.064 77.1077C194.238 72.7362 217.38 88.7899 221.751 112.965L227.036 142.189C231.251 165.499 207.704 184.047 186.03 174.49C175.248 169.735 162.672 171.841 154.026 179.848L153.104 180.701C134.873 197.585 105.184 187.666 100.762 163.214L99.4287 155.841L95.7941 135.741C91.4226 111.567 107.476 88.4253 131.651 84.0538L170.064 77.1077ZM183.363 115.36C181.176 117.568 179.674 119.085 179.103 115.924C178.052 110.117 181.909 104.558 187.716 103.508C193.523 102.458 199.082 106.314 200.132 112.121C200.667 115.081 199.573 114.382 197.603 113.124C195.706 111.913 192.998 110.184 190.15 110.699C187.504 111.178 185.193 113.511 183.363 115.36ZM165.445 141.768C154.893 144.467 150.649 126.56 149.251 120.067C149.135 119.527 149.482 119.004 150.022 118.889L168.883 114.868C169.423 114.753 169.954 115.09 170.077 115.628C170.121 115.822 170.168 116.026 170.217 116.238L170.218 116.243C171.787 123.057 175.502 139.196 165.445 141.768ZM140.397 120.941C141.124 122.845 140.17 124.979 138.265 125.706L137.481 126.005C135.144 126.897 133.972 129.515 134.864 131.853L135.163 132.637C135.89 134.542 134.935 136.675 133.031 137.402C131.126 138.129 128.993 137.174 128.266 135.269L127.967 134.485C127.074 132.148 124.456 130.976 122.119 131.868L121.335 132.167C119.43 132.894 117.297 131.939 116.57 130.035C115.843 128.13 116.798 125.997 118.702 125.27L119.486 124.971C121.824 124.078 122.996 121.46 122.103 119.123L121.804 118.339C121.077 116.435 122.032 114.301 123.937 113.574C125.841 112.847 127.975 113.802 128.702 115.707L129.001 116.49C129.893 118.828 132.511 120 134.848 119.107L135.632 118.808C137.537 118.081 139.67 119.036 140.397 120.941Z"
        fill="url(#paint0_linear_4987_18134)"
      />

      <G filter="url(#filter1_d_4987_18134)">
        <Path
          d="M96.2401 97.7448C93.4313 90.6213 96.5963 82.5375 103.495 79.2148C96.3716 82.0236 88.2878 78.8586 84.9651 71.9598C87.7739 79.0833 84.6089 87.1671 77.7101 90.4898C84.8336 87.681 92.9174 90.846 96.2401 97.7448Z"
          fill="url(#paint1_linear_4987_18134)"
        />
      </G>

      <G filter="url(#filter2_d_4987_18134)">
        <Path
          d="M87.5516 115.381C85.5468 110.297 87.8058 104.527 92.7298 102.155C87.6454 104.16 81.8756 101.901 79.504 96.9773C81.5088 102.062 79.2498 107.831 74.3258 110.203C79.4102 108.198 85.18 110.457 87.5516 115.381Z"
          fill="url(#paint2_linear_4987_18134)"
        />
      </G>

      <Defs>
        <Filter
          id="filter0_f_4987_18134"
          x="52.7539"
          y="53.1233"
          width="102.066"
          height="155.13"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <FeGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_4987_18134" />
        </Filter>

        <Filter
          id="filter1_d_4987_18134"
          x="3.71094"
          y="0.959717"
          width="173.783"
          height="173.785"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <FeOffset dy="3" />
          <FeGaussianBlur stdDeviation="37" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.94 0 0 0 0 1 0 0 0 1 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4987_18134" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4987_18134" result="shape" />
        </Filter>

        <Filter
          id="filter2_d_4987_18134"
          x="0.326172"
          y="25.9773"
          width="166.404"
          height="166.404"
          filterUnits="userSpaceOnUse"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <FeOffset dy="3" />
          <FeGaussianBlur stdDeviation="37" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.94 0 0 0 0 1 0 0 0 1 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4987_18134" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4987_18134" result="shape" />
        </Filter>

        <LinearGradient
          id="paint0_linear_4987_18134"
          x1="167.577"
          y1="172.3"
          x2="111.328"
          y2="119.619"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00A6B8" />
          <Stop offset="1" stopColor="#C7FCFF" />
        </LinearGradient>

        <LinearGradient
          id="paint1_linear_4987_18134"
          x1="96.2401"
          y1="97.7448"
          x2="84.9651"
          y2="71.9598"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#C3FCFF" />
          <Stop offset="1" stopColor="#03ECFB" />
        </LinearGradient>

        <LinearGradient
          id="paint2_linear_4987_18134"
          x1="87.5516"
          y1="115.381"
          x2="79.504"
          y2="96.9773"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#C3FCFF" />
          <Stop offset="1" stopColor="#03ECFB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};