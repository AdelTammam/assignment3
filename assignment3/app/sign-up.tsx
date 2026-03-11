import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import FormInput from "../components/FormInput";
import { signUpSchema, SignUpFormData } from "../schemas/authSchemas";

// ── Password strength helper ─────────────────────────────
function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "#e5e7eb" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map: Record<number, { label: string; color: string }> = {
    1: { label: "Weak", color: "#ef4444" },
    2: { label: "Fair", color: "#f59e0b" },
    3: { label: "Good", color: "#3b82f6" },
    4: { label: "Strong", color: "#10b981" },
  };
  return { score, ...(map[score] ?? { label: "Weak", color: "#ef4444" }) };
}

export default function SignUpScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password to drive strength meter
  const passwordValue = useWatch({ control, name: "password" });
  const strength = getPasswordStrength(passwordValue ?? "");

  const onSubmit = (data: SignUpFormData) => {
    Alert.alert(
      "Account Created ✅",
      `Welcome, ${data.fullName}!\nYour account for ${data.email} is ready.`
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Create Account" }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo area */}
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={34} color="#fff" />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today — it's free</Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Jane Doe"
                  iconName="person-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.fullName?.message}
                  autoCapitalize="words"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Email Address"
                  placeholder="you@example.com"
                  iconName="mail-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Password"
                  placeholder="Create a strong password"
                  iconName="lock-closed-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  isPassword
                />
              )}
            />

            {/* Password strength meter */}
            {passwordValue?.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBars}>
                  {[1, 2, 3, 4].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthBar,
                        {
                          backgroundColor:
                            i <= strength.score ? strength.color : "#e5e7eb",
                        },
                      ]}
                    />
                  ))}
                </View>
                {strength.label ? (
                  <Text style={[styles.strengthLabel, { color: strength.color }]}>
                    {strength.label}
                  </Text>
                ) : null}
              </View>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  iconName="shield-checkmark-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  isPassword
                />
              )}
            />

            {/* Password rules hint */}
            <View style={styles.rulesBox}>
              <Text style={styles.rulesTitle}>Password must include:</Text>
              {[
                "At least 8 characters",
                "One uppercase letter",
                "One number",
                "One special character",
              ].map((rule) => (
                <View key={rule} style={styles.ruleRow}>
                  <Ionicons name="ellipse" size={6} color="#6b7280" />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, !isValid && isDirty && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid && isDirty}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Create Account</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Footer link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f3f4f6",
    padding: 24,
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 28,
    marginTop: 12,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginBottom: 16,
    gap: 10,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: 5,
    borderRadius: 4,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "700",
    width: 48,
    textAlign: "right",
  },
  rulesBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  rulesTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 3,
  },
  ruleText: {
    fontSize: 12,
    color: "#6b7280",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#059669",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 4,
    gap: 8,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#6ee7b7",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },
  footerLink: {
    color: "#059669",
    fontSize: 14,
    fontWeight: "700",
  },
});
