import { Helmet } from "react-helmet";

export default function NotFound({ className }: { className: string }) {
  return (
    <div className={className}>
      <Helmet>
        <title>Page Not Found</title>
        <meta name="description" content="This page cannot be found." />
      </Helmet>
      <p>Page not found</p>
    </div>
  );
}
