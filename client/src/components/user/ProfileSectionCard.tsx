interface Field {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  type?: "text" | "select";
  options?: string[];
  disabled?: boolean;
}

interface ProfileSectionCardProps {
  title: string;
  fields: Field[];
  isOpen: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export default function ProfileSectionCard({
  title,
  fields,
  isOpen,
  onToggle,
  onSave,
}: ProfileSectionCardProps) {
  return (
    <div className="profile-section">
      <button className="btn-secondary" onClick={onToggle}>
        {title}
      </button>
      {isOpen && (
        <>
          <div>
            {fields.map((field, idx) => (
              <div className="form-group" key={idx}>
                <label className="form-label">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange?.(e.target.value)}
                    className="form-select"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange?.(e.target.value)}
                    disabled={field.disabled}
                    className="form-input"
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <button onClick={onSave}>Save Changes</button>
          </div>
        </>
      )}
    </div>
  );
}
