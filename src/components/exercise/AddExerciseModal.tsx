import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Props som komponenten mottar fra parent-komponent
// Komponenten eier ikke states selv, men får verdier gjennom props
type AddExerciseModalProps = {
  visible: boolean; // Om modal skal være synlig
  exerciseName: string; // navn på øvelsen
  muscleGroup: string; // valgt muskelgruppe
  muscleGroups: string[]; // liste over tilgjengelige muskelgrupper
  isMuscleGroupMenuVisible: boolean; // Om dropdown meny for muskelgrupper skal være synlig
  onChangeExerciseName: (text: string) => void; // Kalles når bruker skriver i textinput
  onToggleMuscleGroupMenu: () => void; //  Åpner/lukker dropdown meny
  onSelectMuscleGroup: (group: string) => void; // kalles når bruker velger muskelgruppe
  onCancel: () => void; // kalle når bruker trykker avbryt
  onAdd: () => void; // Legger til øvelse
};

export default function AddExerciseModal({
  visible,
  exerciseName,
  muscleGroup,
  muscleGroups,
  isMuscleGroupMenuVisible,
  onChangeExerciseName,
  onToggleMuscleGroupMenu,
  onSelectMuscleGroup,
  onCancel,
  onAdd,
}: AddExerciseModalProps) {
  return (
    <Modal // Parent bestemmer om modal skal vises
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Legg til øvelse</Text>

          {/* Felt for å skrive inn navn på øvelsen */}
          <Text style={styles.inputLabel}>Navn</Text>

          <TextInput
            style={styles.input}
            value={exerciseName}
            onChangeText={(text) =>
              onChangeExerciseName(text.charAt(0).toUpperCase() + text.slice(1))
            }
            placeholder="F.eks. Knebøy"
          />

          {/* Velger muskelgruppe til øvelsen */}
          <Text style={styles.inputLabel}>Muskelgruppe</Text>

          <Pressable
            style={styles.selectButton}
            onPress={onToggleMuscleGroupMenu}
          >
            <Text style={styles.selectButtonText}>
              {muscleGroup || "Velg muskelgruppe"}
            </Text>
          </Pressable>

          {/* Viser listen over muskelgrupper når dropdown meny er åpen */}
          {isMuscleGroupMenuVisible && (
            <View style={styles.selectMenu}>
              {muscleGroups.map((group) => (
                <Pressable
                  key={group}
                  style={styles.selectOption}
                  onPress={() => onSelectMuscleGroup(group)}
                >
                  <Text style={styles.selectOptionText}>{group}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.modalButtons}>
            {/* Avbryt knapp */}
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <Text>Avbryt</Text>
            </Pressable>

            {/* Legg til knapp */}
            <Pressable onPress={onAdd} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Legg til</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  cancelButton: {
    padding: 12,
  },

  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2563eb",
  },

  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  selectButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  selectButtonText: {
    fontSize: 16,
  },

  selectMenu: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },

  selectOption: {
    padding: 12,
    backgroundColor: "#ffffff",
  },

  selectOptionText: {
    fontSize: 16,
  },
});
