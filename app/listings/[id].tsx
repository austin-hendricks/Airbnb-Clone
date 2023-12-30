import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ListingDetailsPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	return (
		<View>
			<Text>ListingDetailsPage</Text>
		</View>
	);
};

export default ListingDetailsPage;
