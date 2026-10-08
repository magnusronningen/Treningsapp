import { Pressable, StyleSheet, Text, View } from "react-native";

type MuscleGroupFilterProps = {
  muscleGroups: string[];
  selectedMuscleGroup: string;
  onSelect: (muscleGroup: string) => void;
};

export default function MuscleGroupFilter({
  muscleGroups,
  selectedMuscleGroup,
  onSelect,
}: MuscleGroupFilterProps) {
  return (
    <View style={styles.container}>
      {muscleGroups.map((group) => (
        <Pressable
          key={group}
          style={[
            styles.button,
            selectedMuscleGroup === group && styles.activeButton,
          ]}
          onPress={() => onSelect(group)}
        >
          <Text
            style={[
              styles.text,
              selectedMuscleGroup === group && styles.activeText,
            ]}
          >
            {group}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },

  activeButton: {
    backgroundColor: "#2563eb",
  },

  text: {
    fontSize: 14,
  },

  activeText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
