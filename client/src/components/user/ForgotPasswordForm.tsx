import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation, gql } from "@apollo/client";

const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

interface ForgotPasswordFormProps {
  onClose: () => void;
}

export default function ForgotPasswordForm({
  onClose,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await requestPasswordReset({ variables: { email } });
      setSubmitted(true);
    } catch (err) {
      console.error("Password reset request failed", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <p>
            If your email exists in our system, a password reset link has been
            sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <div className="form-group">
              <label htmlFor="reset-email" className="form-label">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="form-input"
                required
              />
            </div>
            <button type="submit">Send Reset Link</button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
