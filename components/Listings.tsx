import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
	listings: any[];
	category: string;
}

const Listings = ({ listings: items, category }: Props) => {
	const [loading, setLoading] = useState(false);
	const listRef = useRef<FlatList>(null);

	useEffect(() => {
		console.log("RELOAD LISTINGS: ", items.length);
		setLoading(true);

		// Just a UI clone, so simulate waiting for a network request
		setTimeout(() => {
			setLoading(false);
		}, 200);
	}, [category]);

	const renderRow: ListRenderItem<Listing> = ({ item }) => (
		<Link href={`/listings/${item.id}`} asChild>
			<TouchableOpacity>
				<Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
					<Image source={{ uri: item.xl_picture_url }} style={styles.image} />
					<TouchableOpacity style={{ position: "absolute", top: 30, right: 30 }}>
						<Ionicons name="heart-outline" size={24} color="black" />
					</TouchableOpacity>

					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
							{item.property_type === "House" || item.property_type === "Apartment"
								? item.room_type === "Entire home/apt"
									? "Home"
									: item.room_type
								: item.property_type}{" "}
							in {item.smart_location}
						</Text>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Ionicons name="star" size={16} />
							<Text style={{ fontFamily: "mon" }}>{item.review_scores_rating / 20}</Text>
						</View>
					</View>

					<Text style={{ fontFamily: "mon", fontSize: 12, color: Colors.grey }}>{item.name}</Text>

					<View style={{ flexDirection: "row", gap: 4 }}>
						<Text style={{ fontFamily: "mon-sb" }}>${item.price}</Text>
						<Text style={{ fontFamily: "mon" }}>night</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	);

	return (
		<View style={defaultStyles.container}>
			<FlatList data={loading ? [] : items} ref={listRef} renderItem={renderRow} />
		</View>
	);
};

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 10,
		marginVertical: 16,
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 15,
	},
});

export default Listings;
