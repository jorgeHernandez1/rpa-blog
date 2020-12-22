const loginBtn = document.querySelector('#loginBtn');
const signUpBtn = document.querySelector('#signUpBtn');

// Set click event listener for login button
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  // Collect user data and trim and trailing spaces
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#pw-login').value.trim();
  // Make sure both elements have data
  if (email && password) {
    const userData = {
      email,
      password,
    };
    // Make request to login server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });
    // Make sure user was logged in
    if (response.ok) {
      document.location.reload();
    } else {
      document
        .querySelector('#login-error')
        .textContent = 'Failed to login. Try again.';
    }
  }
});

// Set click event listener for sign up button
signUpBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  // Collect user data and trim and trailing spaces
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#pw-signup').value.trim();
  const name = document.querySelector('#name-signup').value.trim();
  // Make sure both elements have data
  if (email && password && name) {
    const userData = {
      email,
      password,
      name,
    };
    // Make request to login server
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });
    // Make sure user was logged in
    if (response.ok) {
      document.location.replace('/');
    } else {
      document
        .querySelector('#sign-up-error')
        .textContent('An error occured. Please verify your entry and try again.');
    }
  }
});
