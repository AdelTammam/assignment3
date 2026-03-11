import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  iconName,
  isPassword = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error ? styles.errorBorder : null,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={18}
            color={error ? "#e74c3c" : isFocused ? "#4f46e5" : "#9ca3af"}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor="#9ca3af"
          secureTextEntry={isPassword && !isVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsVisible((v) => !v)}>
            <Ionicons
              name={isVisible ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle-outline" size={13} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  focused: {
    borderColor: "#4f46e5",
    backgroundColor: "#fff",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  errorBorder: {
    borderColor: "#e74c3c",
    backgroundColor: "#fff5f5",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#e74c3c",
    flex: 1,
  },
});
