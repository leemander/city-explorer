export default function ({ message, setErrorMessage }) {
  function handleClick(e) {
    e.target.className === "error-backdrop" && setErrorMessage("");
  }

  return (
    <div className="error-backdrop" onClick={(e) => handleClick(e)}>
      <dialog>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={() => setErrorMessage("")}>Dismiss</button>
      </dialog>
    </div>
  );
}
