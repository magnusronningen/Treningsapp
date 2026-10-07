import TodaysWorkoutCard from "@/components/TodaysWorkoutCard";
import { Workout } from "@/utils/workout";
import { StyleSheet, Text, View } from "react-native";

const todaysWorkout: Workout = {
  id: "1",
  name: "Push",
  muscles: ["Bryst, triceps"],
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hei, Magnus</Text>

      <Text style={styles.subtitle}>Klar for dagens trening?</Text>
      <TodaysWorkoutCard workout={todaysWorkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 0,
  },
});
