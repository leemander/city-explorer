export default function ({ message, setErrorMessage }) {
  return (
    <div className="error-backdrop">
      <dialog>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={() => setErrorMessage("")}>Dismiss</button>
      </dialog>
    </div>
  );
}
