import { Link } from "@remix-run/react";

function NotFound(){
  return (
    <section className="[ container-small ]">
      <h2 className="[ fs-900 bold ]">Woops! Something went wrong 🤖</h2>
        <Link
          to={"/"}
          className="[ button ]"
        >
          Go back to the Homepage
        </Link>

    </section>
  );
};

export default NotFound;