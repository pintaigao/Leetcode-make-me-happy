import './contact-form.scss';
import useSubmitForm from "./useSubmitForm.ts";
const SUBMIT_URL = 'https://questions.greatfrontend.com/api/questions/contact-form';

export default function ContactForm() {
  function submitForm(event) {
    useSubmitForm(event, SUBMIT_URL).then((response) => {
      console.log(response);
    });
  }
  
  return (
    <form
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}
      action="https://questions.greatfrontend.com/api/questions/contact-form"
      method="post">
      <div>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email-input">Email</label>
        <input id="email-input" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="message-input">Message</label>
        <textarea
          id="message-input"
          name="message"></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
}