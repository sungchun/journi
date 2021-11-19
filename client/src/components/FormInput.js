const FormInput = ({ name, type, placeholder, data, handleFormChange }) => {
  return (
    <div className="field">
      <label for={name}>{name}:</label>
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        value={data[name]}
        onChange={handleFormChange}
      />
    </div>
  );
};

export default FormInput;
