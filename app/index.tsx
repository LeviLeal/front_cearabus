import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Link href="/login" style={styles.loginButton}>Entrar no CearáBus</Link>
      <Text style={styles. descriptionText}>O CearaBus tem a missão de facilitar a vida do universitario de Quixeramobim, modernidade na palma da sua mão.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  descriptionText: {
    textAlign: "center"
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "../assets/icon.png"
  },
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: "blue",
    color: "white",
    borderRadius: 8,
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: "500",
  }

})