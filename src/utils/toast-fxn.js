import { ToastContainer, toast } from 'react-toastify';
import './custom-toastify.css'; // Import the custom CSS for additional styles

export const notifySuccessFxn = (message) =>
toast.success(message, {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme:"dark",
  draggable: true,
  progress: undefined
});

export const notifyErrorFxn = (message) =>
toast.error(
  <div>
  {message.split("\n").map((line, index) => (
    <p key={index}>{line}</p>
  ))}
</div>
  , {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme:"dark",
  draggable: true,
  progress: undefined
});