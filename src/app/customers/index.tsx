import {useEffect, useState} from "react";
import {
	ActivityIndicator,
	Button,
	FlatList,
	Text,
	TextInput,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {StyleSheet} from "react-native";
import {CustomerRow} from "@/components/customer-row";
import TotalOwed from "@/components/total-owed";
import {problemFor, Status} from "@/data/problem";
import {Customer, fetchCustomers} from "@/data/customers";
import {ThemedView} from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";
import {Spacing} from "@/constants/theme";
import {useTheme} from "@/hooks/use-theme";
import {useRouter} from "expo-router";
import {AddCustomerModal} from "@/components/add-customer-modal";
import {useCustomers} from "@/hooks/use-customers";
import {useProfile} from "@/hooks/use-profile";

export default function CustomerScreen() {
	const theme = useTheme();
	const router = useRouter();
	const {status, customers, problem, retry} = useCustomers();
	const profile = useProfile();

	const [query, setQuery] = useState("");
	const [adding, setAdding] = useState(false);

	if (status === "loading")
		return (
			<ThemedView style={styles.middle}>
				<ActivityIndicator />
				<ThemedText themeColor="textSecondary">Loading customers</ThemedText>
			</ThemedView>
		);

	if (status === "error")
		return (
			<ThemedView style={styles.middle}>
				<ThemedText>{problem}</ThemedText>
				<Button title="Try again" onPress={retry} />
			</ThemedView>
		);

	if (status === "empty")
		return (
			<ThemedView style={styles.middle}>
				<ThemedText>No customers yet.</ThemedText>
			</ThemedView>
		);

	const shown = customers.filter((c) =>
		c.name.toLowerCase().includes(query.toLowerCase()),
	);
	const total = shown.reduce((sum, c) => sum + c.balance, 0);

	return (
		<SafeAreaView style={styles.screen}>
			<TextInput
				value={query}
				onChangeText={setQuery}
				placeholder="Search customers"
				style={[
					styles.search,
					{color: theme.text, borderColor: theme.textSecondary},
				]}
			/>
			{profile?.role === "admin" && (
				<Button title="Add customer" onPress={() => setAdding(true)} />
			)}

			<AddCustomerModal
				visible={adding}
				onClose={() => setAdding(false)}
				onAdded={retry}
			/>
			<ThemedText>Total owed: ₱ {total.toFixed(2)}</ThemedText>
			<FlatList
				data={shown}
				keyExtractor={(c) => c.id}
				renderItem={({item}) => (
					<CustomerRow
						name={item.name}
						balance={item.balance}
						onPress={() => router.push(`/customers/${item.id}`)}
					/>
				)}
				ListEmptyComponent={
					<ThemedText>No customers match "{query}".</ThemedText>
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	middle: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: Spacing.three,
	},
	screen: {flex: 1, padding: Spacing.four, gap: Spacing.three},
	search: {borderWidth: 1, borderRadius: Spacing.two, padding: Spacing.three},
});
