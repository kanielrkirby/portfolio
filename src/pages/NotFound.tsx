export default function NotFound({ className }: { className: string }) {
  return (
    <div className={className}>
      <h1 className="text-3xl">404</h1>
      <p>Page not found</p>
    </div>
  );
}
