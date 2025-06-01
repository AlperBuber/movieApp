export default function ErrorMessage({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error:</strong> {error}
    </div>
  );
}
