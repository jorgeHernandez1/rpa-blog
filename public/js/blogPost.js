const addNewPostBtn = document.querySelector('#addNewPostBtn');

// Create New Post
const addNewPost = async (e) => {
  e.preventDefault();
  // Collect form data
  const title = document.querySelector('#blog-post-title').value.trim();
  const body = document.querySelector('#blog-post-body').value.trim();

  if (title && body) {
    const userData = {
      title,
      post_body: body,
    };
    // Send form data to create new post api
    const response = await fetch('/api/blogPost', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check for errors from DB when adding new post
    if (response.ok) {
      document.location.reload();
    } else {
      document
        .querySelector('#new-post-error')
        .textContent = 'An error occured when submiting a new post. Try again.';
    }
  } else {
    document
      .querySelector('#new-post-error')
      .textContent = 'Please provide a Blog Post Title and Body to submit new post.';
  }
};

addNewPostBtn.addEventListener('click', addNewPost);
