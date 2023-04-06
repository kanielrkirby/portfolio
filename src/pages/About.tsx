import { Helmet } from "react-helmet";

export default function About({ className }: { className: string }) {
  return (
    <div className={className}>
      <Helmet>
        <title>About Me</title>
        <meta name="description" content="Kaniel Kirby's 'About Me' page." />
      </Helmet>
      <p>Page not completed.</p>
    </div>
  );
}
