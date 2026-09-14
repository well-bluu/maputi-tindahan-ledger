import {useState} from "react";
import {Platform, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {ThemedText} from "@/components/themed-text";
import {ThemedView} from "@/components/themed-view";
import TotalOwed from "@/components/total-owed";
import {WebBadge} from "@/components/web-badge";
import {BottomTabInset, MaxContentWidth, Spacing} from "@/constants/theme";
import {SEED} from "@/data/customers";

export default function HomeScreen() {
	const [customers, setCustomers] = useState(SEED);

	const total = customers.reduce((sum, c) => sum + c.balance, 0);

	return (
		<ThemedView style={styles.container}>
			<SafeAreaView style={styles.safeArea}>
				<ThemedView style={styles.heroSection}>
					<ThemedText type="code" style={styles.code}>
						sari-sari store
					</ThemedText>
					<ThemedText type="title" style={styles.title}>
						Welcome to Mama Mia
					</ThemedText>
					<ThemedText type="code" style={styles.code}>
						Customer Credit
					</ThemedText>
				</ThemedView>

				<ThemedView type="backgroundElement" style={styles.stepContainer}>
					<TotalOwed total={total} />
					<ThemedText type="code" style={styles.code}>
						Customers with balance: 2 of 3
					</ThemedText>
				</ThemedView>

				{Platform.OS === "web" && <WebBadge />}
			</SafeAreaView>
		</ThemedView>
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
