import { Alert, StyleSheet, Text, View, Pressable } from "react-native";
import type { Exercise } from "@/utils/exercise";

type ExerciseCardProps = {
  exercise: Exercise;
  onDelete: (id: string) => void;
};

export default function ExerciseCard({
  exercise,
  onDelete,
}: ExerciseCardProps) {
  // Bekreft sletting - TODO: fiske alert for ios og android
  function handleDelete() {
    const confirmed = window.confirm(
      `Er du sikker på at du vil slette ${exercise.name}?`,
    );

    if (confirmed) {
      onDelete(exercise.id);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.muscleGroup}>{exercise.muscleGroup}</Text>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Slett</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  muscleGroup: {
    marginTop: 4,
    fontSize: 14,
  },
  deleteButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
  },
  deleteButtonText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "600",
  },
});
