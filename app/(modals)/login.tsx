import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const LoginModal = () => {
	useWarmUpBrowser();

	enum Strategy {
		GOOGLE = "oauth_google",
		APPLE = "oauth_apple",
		FACEBOOK = "oauth_facebook",
	}

	const router = useRouter();

	const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
	const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
	const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: "oauth_facebook" });

	const onSelectAuth = async (strategy: Strategy) => {
		const selectedAuth = {
			[Strategy.GOOGLE]: googleAuth,
			[Strategy.APPLE]: appleAuth,
			[Strategy.FACEBOOK]: facebookAuth,
		}[strategy];

		try {
			const { createdSessionId, setActive } = await selectedAuth();

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
				router.back();
			}
		} catch (error) {
			console.error("OAuth error: ", error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				autoCapitalize="none"
				placeholder="Email"
				keyboardType="email-address"
				style={[defaultStyles.inputField, { marginBottom: 30 }]}
			/>
			<TouchableOpacity style={defaultStyles.btn}>
				<Text style={defaultStyles.btnText}>Continue</Text>
			</TouchableOpacity>
			<View style={styles.separatorView}>
				<View style={styles.separator} />
				<Text style={styles.separatorText}>or</Text>
				<View style={styles.separator} />
			</View>
			<View style={{ gap: 16 }}>
				<TouchableOpacity style={defaultStyles.btnOutline}>
					<Feather name="smartphone" size={24} style={[defaultStyles.btnIcon, { left: 12 }]} />
					<Text style={defaultStyles.btnOutlineText}>Continue with Phone</Text>
				</TouchableOpacity>
				<TouchableOpacity style={defaultStyles.btnOutline} onPress={() => onSelectAuth(Strategy.APPLE)}>
					<FontAwesome5 name="apple" size={24} style={[defaultStyles.btnIcon, { left: 16 }]} />
					<Text style={defaultStyles.btnOutlineText}>Continue with Apple</Text>
				</TouchableOpacity>
				<TouchableOpacity style={defaultStyles.btnOutline} onPress={() => onSelectAuth(Strategy.GOOGLE)}>
					<Image
						source={require("@/assets/icons/google_g_icon.png")}
						fadeDuration={0}
						style={[defaultStyles.btnIcon, { width: 32, height: 32, left: 9 }]}
					/>
					<Text style={defaultStyles.btnOutlineText}>Continue with Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={defaultStyles.btnOutline} onPress={() => onSelectAuth(Strategy.FACEBOOK)}>
					<Image
						source={require("@/assets/icons/facebook_circle_icon.png")}
						fadeDuration={0}
						style={[defaultStyles.btnIcon, { width: 20, height: 20, left: 15 }]}
					/>
					<Text style={defaultStyles.btnOutlineText}>Continue with Facebook</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 26,
	},
	separatorView: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		marginVertical: 40,
	},
	separator: {
		flex: 1,
		borderBottomColor: "#000",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	separatorText: {
		fontFamily: "mon-sb",
		color: Colors.grey,
	},
});

export default LoginModal;
