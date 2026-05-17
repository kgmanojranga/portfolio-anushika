import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const ContactStrip = () => {
  return (
    <section className="py-16">
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-lg font-semibold text-black">Let's work together</h2>
        <p className="text-sm text-neutral-500 max-w-sm">
          Open to project management, operations, and coordination roles.
        </p>
        <Link
          to={ROUTES.CONTACT}
          className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors"
        >
          Contact me
        </Link>
      </div>
    </section>
  );
};

export default ContactStrip;
