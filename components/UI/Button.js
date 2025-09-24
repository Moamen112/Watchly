import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { theme } from 'theme';
import { PlayCircleIcon, PlayIcon } from 'react-native-heroicons/solid';

export default function Button({ children, onPress }) {
  return (
    <Pressable onPress={onPress} className="items-center justify-center px-4">
      <View
        className="w-full flex-row items-center justify-center gap-2 rounded-3xl p-3"
        style={{ backgroundColor: theme.background }}>
        <PlayIcon color="white" size={25} strokeWidth={2} />
        <Text className="text-white ">{children}</Text>
      </View>
    </Pressable>
  );
}
