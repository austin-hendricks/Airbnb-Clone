import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
	{
		name: "Cabins",
		icon: "house-siding",
	},
	{
		name: "Trending",
		icon: "local-fire-department",
	},
	{
		name: "Tiny homes",
		icon: "home",
	},
	{
		name: "City",
		icon: "apartment",
	},
	{
		name: "Beachfront",
		icon: "beach-access",
	},
	{
		name: "Play",
		icon: "videogame-asset",
	},
	{
		name: "Countryside",
		icon: "nature-people",
	},
];

interface Props {
	onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
	const scrollRef = useRef<ScrollView>(null);
	const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const selectCategory = (index: number) => {
		const selected = itemsRef.current[index];
		setActiveIndex(index);

		selected?.measure((x) => {
			scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
		});

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onCategoryChanged(categories[index].name);
	};
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.actionRow}>
					<Link href={"/(modals)/booking"} asChild>
						<TouchableOpacity style={styles.searchBtn}>
							<Ionicons name="search" size={24} />
							<View>
								<Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>Where to?</Text>
								<Text style={{ fontFamily: "mon", fontSize: 12, color: Colors.grey }}>
									Anywhere • Any week • Add guests
								</Text>
							</View>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity style={styles.filterBtn}>
						<Ionicons name="options-outline" size={24} />
					</TouchableOpacity>
				</View>
				<ScrollView
					ref={scrollRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ alignItems: "center", gap: 30, paddingHorizontal: 16 }}
				>
					{categories.map((category, index) => (
						<TouchableOpacity
							key={index}
							ref={(el) => (itemsRef.current[index] = el)}
							onPress={() => selectCategory(index)}
							style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}
						>
							<MaterialIcons
								name={category.icon as any}
								size={24}
								color={activeIndex === index ? "#000" : Colors.grey}
							/>
							<Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
								{category.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default ExploreHeader;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
	container: {
		backgroundColor: "#fff",
		height: 130,
	},
	actionRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingBottom: 16,
	},
	filterBtn: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 24,
	},
	searchBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		borderColor: "#e2e2e2",
		borderWidth: StyleSheet.hairlineWidth,
		width: 325,
		padding: 10,
		borderRadius: 30,
		backgroundColor: "#fff",

		// shadow
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 8,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	categoryText: {
		fontFamily: "mon-sb",
		fontSize: 12,
		color: Colors.grey,
	},
	categoryTextActive: {
		fontFamily: "mon-sb",
		fontSize: 12,
		color: "#000",
	},
	categoryBtn: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
	},
	categoryBtnActive: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
		borderBottomWidth: 2,
		borderBottomColor: "#000",
	},
});
