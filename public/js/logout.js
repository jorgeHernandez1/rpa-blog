const logOutBtn = document.querySelector('#log-out-btn');

logOutBtn.addEventListener('click', async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successfully logged out, redirect to the login page
    document.location.replace('/login');
  }
});
