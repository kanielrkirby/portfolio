import { Helmet } from "react-helmet";

export default function Credits({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Helmet>
        <title>Credits</title>
        <meta
          name="description"
          content="Tells about the people who helped me in creating this website."
        />
      </Helmet>
    </div>
  );
}
