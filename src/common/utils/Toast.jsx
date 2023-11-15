//* LIB
import { toast } from 'react-toastify';

//* IMPORT
import { TIME, TOAST } from '../constants';

let isToastValue = false;

// Option toast React
const option = {
  autoClose: TIME._3_SECOND, // Duration in milliseconds for how long the toast should be visible (5 seconds in this example).
  closeOnClick: true, // Close the toast when clicking on it (true in this example).
  position: TOAST.TOP_RIGHT, // Position of the toast on the screen (top-right in this example).
  theme: TOAST.THEME.LIGHT, // Custom theme for the toast (dark in this example).
};

// Function to show a success toast with a given message.
export const showSuccessToast = (message) => {
  toast.success(message, option);
};

// Function to show a warning toast with a given message.
export const showWarningToast = (message) => {
  toast.warning(message, option);
};

// Function to show an error toast with a given message.
export const showErrorToast = (message) => {
  if (!isToastValue) {
    toast.error(message, {
      ...option,
      onClose: () => {
        isToastValue = false;
      },
    });

    isToastValue = true;
  }
};

// Function to show an info toast with a given message.
export const showInfoToast = (message) => {
  if (!isToastValue) {
    toast.info(message, {
      ...option,
      onClose: () => {
        isToastValue = false;
      },
    });

    isToastValue = true;
  }
};
