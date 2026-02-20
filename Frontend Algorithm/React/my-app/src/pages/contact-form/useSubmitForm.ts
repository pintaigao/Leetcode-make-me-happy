async function useSubmitForm(event, SUBMIT_URL) {
  event.preventDefault();
  
  const form = event.target;
  
  try {
    if (form.action !== SUBMIT_URL) {
      alert('Incorrect form action value');
      return;
    }
    
    if (form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value');
      return;
    }
    
    const formData = new FormData(form);
    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });
    
    const text = await response.text();
    alert(text);
    
    return text;
  } catch (_) {
    alert('Error submitting form!');
  }
}

export default useSubmitForm;