import {
	ActivityIndicator,
	Button,
	Platform,
	StyleSheet,
	View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {ThemedText} from "@/components/themed-text";
import {ThemedView} from "@/components/themed-view";
import {WebBadge} from "@/components/web-badge";
import {BottomTabInset, MaxContentWidth, Spacing} from "@/constants/theme";

import {summarise} from "@/data/summary";
import {Stat} from "@/components/stat";
import {useCustomers} from "@/hooks/use-customers";
import {ShareBar} from "@/components/share-bar";

export default function HomeScreen() {
	const {status, customers, problem, retry} = useCustomers();

	if (status === "loading") {
		return (
			<ThemedView style={styles.middle}>
				<ActivityIndicator />
				<ThemedText themeColor="textSecondary">Loading the ledger</ThemedText>
			</ThemedView>
		);
	}

	if (status === "error") {
		return (
			<ThemedView style={styles.middle}>
				<ThemedText>{problem}</ThemedText>
				<Button title="Try again" onPress={retry} />
			</ThemedView>
		);
	}

	if (status === "empty") {
		return (
			<ThemedView style={styles.middle}>
				<ThemedText>No customers yet.</ThemedText>
				<ThemedText type="small" themeColor="textSecondary">
					Add the first one to see the totals.
				</ThemedText>
			</ThemedView>
		);
	}

	const summary = summarise(customers);

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
					<View style={styles.statRow}>
						<Stat label="Total owed" value={`₱ ${summary.total.toFixed(2)}`} />
						<Stat
							label="Average owed"
							value={`₱ ${summary.average.toFixed(2)}`}
						/>
					</View>
					<View style={styles.statRow}>
						<Stat
							label="Still owing"
							value={`${summary.owing} of ${summary.count}`}
						/>
						<Stat label="Settled" value={String(summary.settled)} />
					</View>
				</ThemedView>

				<ThemedView type="backgroundElement" style={styles.card}>
					<ThemedText type="small" themeColor="textSecondary">
						Share of what is owed
					</ThemedText>
					{summary.ranked.map((c) => (
						<ShareBar
							key={c.id}
							name={c.name}
							balance={c.balance}
							share={c.share}
						/>
					))}
					{summary.ranked.length === 0 && (
						<ThemedText themeColor="textSecondary">
							Everyone has paid up.
						</ThemedText>
					)}
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
	statRow: {flexDirection: "row", gap: Spacing.four},
	middle: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: Spacing.two,
	},
	card: {borderRadius: Spacing.four, padding: Spacing.four, gap: Spacing.four},
});
