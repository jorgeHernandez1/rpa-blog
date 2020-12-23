const addNewPostBtn = document.querySelector('#addNewPostBtn');
const editPostBtn = document.querySelector('#editPostBtn');
const clickablePost = document.querySelectorAll('.my-post');

// Create New Post
const addNewPost = async (e) => {
  e.preventDefault();
  // Collect form data
  const newModal = $('#newPostModal');
  const title = newModal.find('#blog-post-title').val().trim();
  const body = newModal.find('#blog-post-body').val().trim();

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
// Edit blog post
const populateDataToEdit = async (e) => {
  const editModal = $('#editPostModal');
  const clickedTitle = e.target.offsetParent.querySelector('.card-title').textContent.trim();
  const clickedBody = e.target.offsetParent.querySelector('.card-text').textContent.trim();

  editModal.find('#blog-post-title').val(clickedTitle);
  editModal.find('#blog-post-body').val(clickedBody);
  editModal.modal('show');
};

const editBlogPost = async (e) => {
  e.preventDefault();
  // Collect form data
  const editModal = $('#editPostModal');
  const title = editModal.find('#blog-post-title').val().trim();
  const body = editModal.find('#blog-post-body').val().trim();

  if (title && body) {
    const userData = {
      title,
      post_body: body,
    };
    // Send form data to create new post api
    const response = await fetch('/api/blogPost', {
      method: 'PUT',
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

clickablePost.forEach((blogPost) => blogPost.addEventListener('click', populateDataToEdit));
addNewPostBtn.addEventListener('click', addNewPost);
editPostBtn.addEventListener('click', editBlogPost);
