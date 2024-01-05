import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
	async getToken(key: string) {
		try {
			return await SecureStore.getItemAsync(key);
		} catch (error) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return await SecureStore.setItemAsync(key, value);
		} catch (error) {
			return;
		}
	},
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		mon: require("../assets/fonts/Montserrat-Regular.ttf"),
		"mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
		"mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY!}>
			<RootLayoutNav />
		</ClerkProvider>
	);
}

function RootLayoutNav() {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push("/(modals)/login");
		}
	}, [isLoaded]);

	return (
		<>
			<StatusBar style="dark" />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="(modals)/login"
					options={{
						title: "Log in or sign up",
						presentation: "modal",
						headerTitleStyle: {
							fontFamily: "mon-b",
						},
						headerLeft: () => (
							<TouchableOpacity onPress={() => router.back()}>
								<Ionicons name="close-outline" size={28} />
							</TouchableOpacity>
						),
					}}
				/>
				<Stack.Screen
					name="listings/[id]"
					options={{
						headerTitle: "",
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					name="(modals)/booking"
					options={{
						presentation: "transparentModal",
						animation: "fade",
						headerLeft: () => (
							<TouchableOpacity onPress={() => router.back()}>
								<Ionicons name="close-outline" size={28} />
							</TouchableOpacity>
						),
					}}
				/>
			</Stack>
		</>
	);
}
