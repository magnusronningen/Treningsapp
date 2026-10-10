import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type CreateWorkoutModalProps = {
  visible: boolean;
  workoutName: string;
  onChangeWorkoutName: (text: string) => void;
  onCancel: () => void;
  onCreate: () => void;
};

export default function CreateWorkoutModal({
  visible,
  workoutName,
  onChangeWorkoutName,
  onCancel,
  onCreate,
}: CreateWorkoutModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Ny økt</Text>

          <TextInput
            style={styles.input}
            placeholder="Navn på økt"
            value={workoutName}
            onChangeText={onChangeWorkoutName}
          />

          <View style={styles.buttons}>
            <Pressable onPress={onCancel}>
              <Text>Avbryt</Text>
            </Pressable>

            <Pressable onPress={onCreate}>
              <Text>Opprett</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  modal: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 20,
  },
});
