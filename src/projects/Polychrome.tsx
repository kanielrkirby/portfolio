import { Helmet } from "react-helmet";

export default function Polychrome({ className }: { className?: string }) {
  return (
    <div>
      <Helmet>
        <title>Projects | Polychrome</title>
        <meta
          name="description"
          content="Tells about the process in creating the project 'Polychrome'."
        />
      </Helmet>
      Polychrome
    </div>
  );
}
