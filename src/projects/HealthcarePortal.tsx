export default function HealthcarePortal() {
  return (
    <>
      <h1 className="mb-4 text-2xl text-black">Doctor Jay's Clinic</h1>
      <P>
        <a
          href="https://piratey7007.github.io/healthcare-portal/"
          target="_blank"
          className="blog-link blog-fancy"
        >
          Doctor Jay's Clinic
        </a>{" "}
        is a basic healthcare portal.
      </P>
    </>
  );
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="font-body text-black">{children}</p>;
};
