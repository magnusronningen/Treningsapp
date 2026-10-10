import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Workout } from "@utils/workout";

type WorkputCardProps = {
  workout: Workout;
  onPress: () => void;
};

export default function WorkoutCard({ workout, onPress }: WorkputCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name}>{workout.name}</Text>

        <Text style={styles.details}>{workout.exercises.length} øvelser</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },

  content: {
    flex: 1,
    gap: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  details: {
    fontSize: 14,
    color: "#6b7280",
  },

  arrow: {
    fontSize: 28,
    color: "#6b7280",
  },
});
