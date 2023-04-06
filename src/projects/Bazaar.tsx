import { Helmet } from "react-helmet";

export default function Bazaar({ className }: { className?: string }) {
  return (
    <div>
      <Helmet>
        <title>Projects | Bazaar</title>
        <meta
          name="description"
          content="Tells about the process in creating the project 'Bazaar'."
        />
      </Helmet>
      Bazaar
    </div>
  );
}
