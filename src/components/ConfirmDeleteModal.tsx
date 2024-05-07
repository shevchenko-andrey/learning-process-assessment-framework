import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onDelete,
  onToggle
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onToggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want delete this test?</ModalHeader>

        <ModalFooter>
          <Button mr={3} onClick={onToggle}>
            No
          </Button>
          <Button bg={"red.200"} onClick={onDelete}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
