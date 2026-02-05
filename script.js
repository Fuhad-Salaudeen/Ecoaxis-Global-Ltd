const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');
const yearEl = document.querySelector('#year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form && feedback) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    feedback.className = '';
    feedback.textContent = 'Submitting your inquiry...';

    const endpoint = form.dataset.endpoint;
    const formData = new FormData(form);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      form.reset();
      feedback.className = 'success';
      feedback.textContent =
        'Thank you. Your inquiry has been received. We will contact you shortly.';
    } catch (error) {
      feedback.className = 'error';
      feedback.innerHTML =
        'We could not submit your inquiry right now. Please email us directly at <a href="mailto:info@ecoaxisglobal.com">info@ecoaxisglobal.com</a>.';
    }
  });
}
