import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

const Layout = () => {
	const { isSignedIn } = useAuth();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primary,
				tabBarLabelStyle: {
					fontFamily: "mon-sb",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: "Explore",
					tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
				}}
			/>

			<Tabs.Screen
				name="wishlists"
				options={{
					tabBarLabel: "Wishlists",
					tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
				}}
			/>

			<Tabs.Screen
				name="trips"
				options={{
					tabBarLabel: "Trips",
					tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />,
				}}
			/>

			<Tabs.Screen
				name="inbox"
				options={{
					tabBarLabel: "Inbox",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="message-outline" color={color} size={size} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabel: isSignedIn ? "Profile" : "Log in",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name={isSignedIn ? "person-circle-outline" : "person-circle"}
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default Layout;
