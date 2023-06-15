import { Form } from "react-router-dom";

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

const SignupForm = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          User <span className="accent">Sign Up</span>
        </h1>
        <p>Signing up. Enter account details to continue.</p>
        <Form method="post">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            aria-label="Email"
            autoComplete="given-name"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            aria-label="Password"
          />
          <input type="hidden" name="_action" value="signUp" />
          <button type="submit" className="btn btn--dark">
            <span>Sign Up</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Kitchen" width={600} />
    </div>
  );
};
export default SignupForm;
