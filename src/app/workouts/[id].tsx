import { useLocalSearchParams, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { getWorkoutById } from "@/utils/workoutsStore";

export default function WorkoutDetailScreen() {
  // Bruker expo router til å navigere til objektets id
  const { id } = useLocalSearchParams<{ id: string }>();

  const workout = getWorkoutById(id);

  if (!workout) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Øktdetaljer" }} />
        <Text>Fant ikke økten</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: workout.name }} />

      <Text style={styles.title}>{workout.name}</Text>
      <Text>{workout.exercises.length} øvelser</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
