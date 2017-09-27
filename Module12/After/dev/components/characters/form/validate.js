const validate = (values) => {
  const errors = {};

  if (!values.gender) {
    errors.gender = 'Required';
  }
  if (values.aliases && values.aliases.length > 10) {
    errors.aliases = { _error: 'To many aliases. Limit to 10.' }
  }

  return errors;
};

export default validate;
