import ErrorMessage from './ErrorMessage';

const FormInput = ({ name, placeholder, formik, textarea }) => {
  const input = textarea ? (
    <textarea
      id={name}
      name={name}
      rows={5}
      onChange={formik.handleChange}
      value={formik.values.articleNote}
      placeholder={placeholder}
    />
  ) : (
    <input
      id={name}
      // name has to match form state names
      name={name}
      type="text"
      onChange={formik.handleChange}
      value={formik.values[name]}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
  return (
    <div className="input-control">
      <label htmlFor={name} className="visually-hidden">
        Topic
      </label>
      {input}
      {formik.touched[name] && formik.errors[name] && (
        <ErrorMessage>{formik.errors[name]}</ErrorMessage>
      )}
    </div>
  );
};

export default FormInput;
