import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Footer from "../components/IconBar";

export default function Contact({ className }: { className: string }) {
  return (
    <div className={className}>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Kaniel Kirby's 'Contact' page." />
      </Helmet>
      <Footer />
    </div>
  );
}
