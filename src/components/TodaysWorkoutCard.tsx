import { StyleSheet, Text, View } from "react-native";
import { Workout } from "@/utils/workout";

type TodaysWorkoutCardProps = {
  workout: Workout;
};

export default function TodaysWorkoutCard({ workout }: TodaysWorkoutCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dagens trening</Text>

      <Text style={styles.workoutName}>{workout.name}</Text>

      <Text style={styles.muscles}>{workout.excercies}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },

  muscles: {
    fontSize: 14,
    marginTop: 4,
  },
});
