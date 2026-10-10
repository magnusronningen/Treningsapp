import { useState } from "react";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import type { Workout } from "@/utils/workout";
import { addWorkout } from "@/utils/workoutsStore";
import WorkoutCard from "@/components/workout/WorkoutCard";
import CreateWorkoutModal from "@/components/workout/CreateWorkoutModal";

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");

  function createWorkout() {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName,
      exercises: [],
    };

    addWorkout(newWorkout);
    setWorkouts((prev) => [...prev, newWorkout]);

    setIsModalVisible(false);
    setWorkoutName("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Økter</Text>

      <Pressable
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Opprett økt</Text>
      </Pressable>

      <CreateWorkoutModal
        visible={isModalVisible}
        workoutName={workoutName}
        onChangeWorkoutName={setWorkoutName}
        onCancel={() => {
          setWorkoutName("");
          setIsModalVisible(false);
        }}
        onCreate={createWorkout}
      />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard
            workout={item}
            onPress={() => {
              router.push(`/workouts/${item.id}`);
            }}
          />
        )}
      />
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
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
  },
  addButtonText: {
    color: "white",
  },
});
