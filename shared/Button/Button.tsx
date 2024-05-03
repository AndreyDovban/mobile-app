import { Pressable, PressableProps, Text, StyleSheet, View, Animated, GestureResponderEvent } from 'react-native';
import { Colors, Radius, Fonts } from '../tokens';

export function Button({ text, ...props }: PressableProps & { text: string }) {
	const animatedValue = new Animated.Value(0);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primary, Colors.primary_hover],
	});

	function fadeIn(e: GestureResponderEvent) {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressIn && props.onPressIn(e);
	}

	function fadeOut(e: GestureResponderEvent) {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressOut && props.onPressOut(e);
	}

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View
				style={{
					...styles.button,
					backgroundColor: color,
				}}
			>
				<Text style={styles.text}>{text}</Text>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: Radius.r10,
		height: 58,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f18,
	},
});