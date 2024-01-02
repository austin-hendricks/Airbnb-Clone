import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

const Page = () => {
	const { signOut, isSignedIn } = useAuth();
	return (
		<View>
			{isSignedIn && <Button title="Log out" onPress={() => signOut()} />}
			{!isSignedIn && <Button title="Log In" onPress={() => router.push("/(modals)/login")} />}
		</View>
	);
};

export default Page;
