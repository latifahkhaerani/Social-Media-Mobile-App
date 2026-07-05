import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function BottomSheet({
  visible,
  onClose,
  title,
  children,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{
            backgroundColor: "#fff",
            minHeight: 300,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 25,
          }}
        >
          <View
            style={{
              width: 60,
              height: 5,
              borderRadius: 10,
              backgroundColor: "#ccc",
              alignSelf: "center",
              marginBottom: 20,
            }}
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            {title}
          </Text>

          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}