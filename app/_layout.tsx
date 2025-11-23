import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{title: "CearaBus"}}/>
        <Stack.Screen name="login" options={{title: "Tela de entrada"}}/>
      </Stack>
    </>
  )
}
