const textField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        className="border-black border"
        name={name}
        value={value}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
};

export default textField;
