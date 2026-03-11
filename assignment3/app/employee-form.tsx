import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import FormInput from "../components/FormInput";
import { employeeSchema, EmployeeFormData } from "../schemas/employeeSchema";

export default function EmployeeFormScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onSubmit",   // slide-recommended: validate only on submit press
    defaultValues: {
      fullName: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "",
      postalCode: "",
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    Alert.alert(
      "Employee Submitted ✅",
      `Name: ${data.fullName}\nID: ${data.employeeId}\nEmail: ${data.email}`,
      [{ text: "Reset", onPress: () => reset() }, { text: "OK" }]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Employee Information" }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header card */}
          <View style={styles.headerCard}>
            <Ionicons name="person-circle-outline" size={32} color="#4f46e5" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.headerTitle}>Employee Information</Text>
              <Text style={styles.headerSubtitle}>All fields are required</Text>
            </View>
          </View>

          {/* Full Name */}
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

          {/* Employee ID */}
          <Controller
            control={control}
            name="employeeId"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Employee ID"
                placeholder="EMP0042"
                iconName="id-card-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.employeeId?.message}
                autoCapitalize="characters"
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Work Email"
                placeholder="jane.doe@company.com"
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

          {/* Phone */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Phone Number"
                placeholder="+1 403-555-0100"
                iconName="call-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
                keyboardType="phone-pad"
              />
            )}
          />

          {/* Department */}
          <Controller
            control={control}
            name="department"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Department"
                placeholder="Software Engineering"
                iconName="business-outline"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.department?.message}
                autoCapitalize="words"
              />
            )}
          />

          {/* Postal Code */}
          <Controller
            control={control}
            name="postalCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Postal Code"
                placeholder="T2X 1A1"
                iconName="location-outline"
                value={value}
                onChangeText={(text) => onChange(text.toUpperCase())}
                onBlur={onBlur}
                error={errors.postalCode?.message}
                autoCapitalize="characters"
                maxLength={7}
              />
            )}
          />

          {/* Submit button */}
          <TouchableOpacity
            style={[styles.button, !isValid && isDirty && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid && isDirty}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Submit Employee</Text>
          </TouchableOpacity>

          {!isValid && isDirty && (
            <Text style={styles.hintText}>
              Please fix the errors above before submitting.
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3730a3",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6366f1",
    marginTop: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4f46e5",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    gap: 8,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#a5b4fc",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  hintText: {
    textAlign: "center",
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 10,
  },
});
