import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "UML Inventory"}}/>
      <Stack.Screen name="home" options={{headerShown: false, title: ''}}/>
      <Stack.Screen name="data" options={{title: ""}}/>
    </Stack>
  );
}
