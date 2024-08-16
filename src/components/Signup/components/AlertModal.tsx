import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AlertModalProps {
  title: string;
  text: string;
  icon: SweetAlertIcon;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const AlertModal = ({
  title,
  text,
  icon,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: AlertModalProps) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    background: '#343437',
    color: '#ffffff',
    confirmButtonColor: '#c3e88d',
    cancelButtonColor: '#c6c6c6',
    customClass: {
      popup: 'custom-swal-popup',
      confirmButton: 'swal2-confirm-button',
      cancelButton: 'swal2-cancel-button',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  });
};

export default AlertModal;