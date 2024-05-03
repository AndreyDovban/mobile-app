import { useEffect, useState } from 'react';
import { ErrorNotificationProps } from './ErrorNotification.props';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../tokens';

export function ErrorNotification({ error }: ErrorNotificationProps) {
	const [isShown, setIsShowm] = useState<boolean>(false);

	const animatedValue = new Animated.Value(-100);
	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (!error) {
			return;
		}
		setIsShowm(true);

		const timer = setTimeout(() => {
			setIsShowm(false);
		}, 3000);
		return () => {
			clearTimeout(timer);
		};
	}, [error]);

	if (!isShown) {
		return <></>;
	}

	return (
		<Animated.View style={{ ...styles.error, transform: [{ translateY: animatedValue }] }} onLayout={onEnter}>
			<Text style={styles.errorText}>{error}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		width: Dimensions.get('screen').width,
		backgroundColor: Colors.red,
		padding: 15,
		top: 0,
		left: 0,
	},
	errorText: {
		fontSize: Fonts.f16,
		color: Colors.white,
		textAlign: 'center',
	},
});