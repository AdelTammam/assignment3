import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#4f46e5" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700", fontSize: 17 },
        headerBackTitle: "Back",
        contentStyle: { backgroundColor: "#f3f4f6" },
      }}
    />
  );
}
