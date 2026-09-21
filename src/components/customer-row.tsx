import {useTheme} from "@/hooks/use-theme";
import {Pressable, Text} from "react-native";
import {ThemedText} from "./themed-text";
import {Spacing} from "@/constants/theme";

type CustomerRowProps = {name: string; balance: number; onPress: () => void};

export function CustomerRow({name, balance, onPress}: CustomerRowProps) {
	const theme = useTheme();
	return (
		<Pressable
			onPress={onPress}
			style={{
				paddingVertical: Spacing.three,
				borderBottomWidth: 1,
				borderColor: theme.backgroundSelected,
			}}>
			<ThemedText>{name}</ThemedText>
			<ThemedText themeColor="textSecondary">₱ {balance.toFixed(2)}</ThemedText>
		</Pressable>
	);
}
