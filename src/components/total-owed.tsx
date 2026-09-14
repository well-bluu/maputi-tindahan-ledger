import {StyleSheet} from "react-native";

import {ThemedText} from "@/components/themed-text";
import {BottomTabInset, MaxContentWidth, Spacing} from "@/constants/theme";

export default function TotalOwed(props: {total: number}) {
	return (
		<ThemedText type="code" style={styles.code}>
			Total owed: ₱ {props.total.toFixed(2)}
		</ThemedText>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row",
	},
	safeArea: {
		flex: 1,
		paddingHorizontal: Spacing.four,
		alignItems: "stretch",
		gap: Spacing.three,
		paddingBottom: BottomTabInset + Spacing.three,
		maxWidth: MaxContentWidth,
	},
	heroSection: {
		alignItems: "flex-start",
		justifyContent: "center",
		flex: 1,
		paddingHorizontal: Spacing.four,
		gap: Spacing.four,
	},
	title: {
		textAlign: "left",
	},
	code: {
		textTransform: "uppercase",
	},
	stepContainer: {
		gap: Spacing.three,
		alignSelf: "stretch",
		paddingHorizontal: Spacing.three,
		paddingVertical: Spacing.four,
		borderRadius: Spacing.four,
	},
});
