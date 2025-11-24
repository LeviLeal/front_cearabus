import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{title: "CearaBus"}}/>
        <Stack.Screen name="login" options={{title: "Tela de entrada"}}/>
        <Stack.Screen name="nav" options={{title: "Tela de entrada"}}/>
        <Stack.Screen name="rotas" options={{title: "Rotas e horários"}}/>
        <Stack.Screen name="perfil" options={{title: "Carteira de estudante"}}/>
        <Stack.Screen name="avisos" options={{title: "Avisos"}}/>
        <Stack.Screen name="reclamacoes" options={{title: "Reclamacões"}}/>
      </Stack>
    </>
  )
}
