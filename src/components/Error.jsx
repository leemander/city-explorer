export default function ({ message, setErrorMessage }) {
  return (
    <dialog open>
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={() => setErrorMessage("")}>Dismiss</button>
    </dialog>
  );
}
