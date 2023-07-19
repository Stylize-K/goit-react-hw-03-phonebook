import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { FcAddDatabase } from 'react-icons/fc';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';

//Регулярні вирази для валідації відповідних полів форми
const regexName = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
// const regexNumber =
//   '+?d{1,4}?[ .-s]?(?d{1,3}?)?[ .-s]?d{1,4}[ .-s]?d{1,4}[ .-s]?d{1,9}';

//Схема для валідації полів форми
const schema = object({
  name: string()
    .matches(regexName, 'Not valid')
    .min(2, 'Name too short')
    .max(15, 'Name too short')
    .trim()
    .required('Required'),
  number: string()
    // .matches(regexNumber, 'Not valid')
    .min(5, 'Number too short')
    .max(15, 'Number too long')
    .trim()
    .required('Required'),
});

export const ContactForm = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={css.form_wrapper}>
        <FcAddDatabase size={'35px'} className={css.icon} />
        <label className={css.label}>
          Name
          <Field
            className={css.input}
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage
            component="div"
            className={css.error_name}
            name="name"
          />
        </label>
        <label className={css.label}>
          Number
          <Field
            className={css.input}
            name="number"
            // pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
        </label>
        <ErrorMessage
          component="div"
          className={css.error_number}
          name="number"
        />
        <button className={css.button_add} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
