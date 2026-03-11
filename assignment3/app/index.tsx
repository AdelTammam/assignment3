import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

interface NavCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color: string;
}

const NavCard: React.FC<NavCardProps> = ({ title, subtitle, icon, onPress, color }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.cardIcon, { backgroundColor: color + "20" }]}>
      <Ionicons name={icon} size={26} color={color} />
    </View>
    <View style={styles.cardText}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Form Demos" }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Hook Form</Text>
          <Text style={styles.headerSubtitle}>Advanced Validation with Zod</Text>
        </View>

        <Text style={styles.sectionLabel}>EMPLOYEE</Text>
        <NavCard
          title="Employee Information"
          subtitle="6-field form with format validation"
          icon="person-circle-outline"
          color="#4f46e5"
          onPress={() => router.push("/employee-form")}
        />

        <Text style={styles.sectionLabel}>AUTHENTICATION</Text>
        <NavCard
          title="Sign In"
          subtitle="Email & password authentication"
          icon="log-in-outline"
          color="#0891b2"
          onPress={() => router.push("/sign-in")}
        />
        <NavCard
          title="Sign Up"
          subtitle="Registration with password strength"
          icon="person-add-outline"
          color="#059669"
          onPress={() => router.push("/sign-up")}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 28,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#c7d2fe",
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
