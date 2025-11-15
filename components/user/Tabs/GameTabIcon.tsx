import Svg, { Circle, Path } from "react-native-svg";

export const GameTabIcon = ({ name, color }: { name: string, color: string }) => {
	switch (name) {
		case "gamepad":
			return (
				<Svg width={24} height={24} stroke={color} strokeWidth={1.5} fill="none">
					<Path d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z" />
					<Path d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232" />
					<Path d="M8 9v2" />
					<Path d="M7 10h2" />
					<Path d="M14 10h2" />
				</Svg>
			);
		case "flag":
			return (
				<Svg width={24} height={24} stroke={color} strokeWidth={2} fill="none">
					<Path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
					<Path d="M5 21v-7" />
				</Svg>
			);
		case "pacman":
			return (
				<Svg width={24} height={24} stroke={color} strokeWidth={2} fill="none">
					<Path d="M5.6 5.6a9 9 0 0 1 13.4 .7l-5.6 5.6l5.6 5.6a9 9 0 1 1 -13.4 -12z" />
					<Circle cx="11.5" cy="7.5" r="1" fill={color} />
				</Svg>
			);
		case "skull":
			return (
				<Svg width={24} height={24} stroke={color} strokeWidth={2} fill="none">
					<Path d="M12 4c4.4 0 8 3.4 8 7.5c0 1.9 -.8 3.6 -2 5v3h-12v-3c-1.2 -1.3 -2 -3.1 -2 -5c0 -4.1 3.6 -7.5 8 -7.5z" />
					<Path d="M10 17v3" />
					<Path d="M14 17v3" />
					<Circle cx="10" cy="11" r="1" />
					<Circle cx="14" cy="11" r="1" />
				</Svg>
			);
		case "stars":
			return (
				<Svg width={24} height={24} stroke={color} strokeWidth={2} fill="none">
					<Path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
				</Svg>
			);
		case "hand":
			return (
				<Svg width={24} height={24} stroke={color} strokeWidth={2} fill="none">
					<Path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" />
					<Path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" />
					<Path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" />
					<Path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
				</Svg>
			);
	}
};
