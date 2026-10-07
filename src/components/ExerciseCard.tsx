import { StyleSheet, Text, View } from "react-native";
import type { Exercise } from "@/utils/exercise";

type ExerciseCardProps = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.muscleGroup}>{exercise.muscleGroup}</Text>
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
});
