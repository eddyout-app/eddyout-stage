import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

interface ResetPasswordFormProps {
  onClose?: () => void;
}
const passwordRequirements =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function ResetPasswordForm({ onClose }: ResetPasswordFormProps) {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!passwordRequirements.test(newPassword)) {
        setError(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        );
        return;
      }

      await resetPassword({ variables: { token, newPassword } });
      setSuccess(true);
      setTimeout(() => {
        if (onClose) {
          onClose();
        } else {
          navigate("/login");
        }
      }, 2000); // wait 2 seconds before redirect
    } catch (err) {
      console.error(err);
      setError("Password reset failed. The token may be invalid or expired.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {success ? (
          <p className="text-green">
            ✅ Password reset successful! Redirecting...
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            {error && <p className="text-red">{error}</p>}

            <div className="form-group">
              <label htmlFor="new-password" className="form-label">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
                className="form-input"
                required
              />
            </div>
            <button type="submit">Reset Password</button>
            {onClose && (
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
