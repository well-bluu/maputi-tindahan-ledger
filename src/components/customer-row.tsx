import {useState} from "react";
import {Pressable, Text} from "react-native";

type CustomerRowProps = {name: string; balance: number; lastPaid: string};

export function CustomerRow({name, balance, lastPaid}: CustomerRowProps) {
	const [expanded, setExpanded] = useState(false);

	return (
		<Pressable
			onPress={() => setExpanded(!expanded)}
			style={{paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd"}}>
			<Text style={{fontSize: 18}}>{name}</Text>
			<Text>₱ {balance.toFixed(2)}</Text>
			{expanded && <Text>Last paid {lastPaid}</Text>}
		</Pressable>
	);
}
