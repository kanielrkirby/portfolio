import { Helmet } from "react-helmet";

export default function Contact({ className }: { className: string }) {
  return (
    <div className={className}>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniel Kirby's 'Contact' page." />
      </Helmet>
      <p>Page not completed.</p>
    </div>
  );
}
