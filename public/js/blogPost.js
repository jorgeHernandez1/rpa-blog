const addNewPostBtn = document.querySelector('#addNewPostBtn');
const editPostBtn = document.querySelector('#editPostBtn');
const deletePostBtn = document.querySelector('#deletePostBtn');
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
      document.querySelector('#new-post-error').textContent = 'An error occured when submiting a new post. Try again.';
    }
  } else {
    document.querySelector('#new-post-error').textContent = 'Please provide a Blog Post Title and Body to submit new post.';
  }
};
// Populate data into modal from clicked post in dashboard
const populateDataToEdit = async (e) => {
  const editModal = $('#editPostModal');
  const clickedTitle = e.target.offsetParent
    .querySelector('.card-title')
    .textContent.trim();
  const clickedBody = e.target.offsetParent
    .querySelector('.card-text')
    .textContent.trim();
  const clickedBPId = e.target.offsetParent.getAttribute('data-bp-id');

  editModal.find('#blog-post-title').val(clickedTitle);
  editModal.find('#blog-post-body').val(clickedBody);
  editModal.attr('data-current-bp', clickedBPId);
  editModal.modal('show');
};
// Edit blog post
const editBlogPost = async (e) => {
  e.preventDefault();
  // Collect form data
  const editModal = $('#editPostModal');
  const title = editModal.find('#blog-post-title').val().trim();
  const body = editModal.find('#blog-post-body').val().trim();
  const bpId = editModal.attr('data-current-bp');

  if (title && body) {
    const userData = {
      title,
      post_body: body,
      post_id: bpId,
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
      document.querySelector('#edit-post-error').textContent = 'An error occured when editing a post. Try again.';
    }
  } else {
    document.querySelector('#edit-post-error').textContent = 'Please provide a Blog Post Title and Body to submit a post.';
  }
};
// Delete Post
const deleteBlogPost = async (e) => {
  e.preventDefault();
  // Collect form data
  const editModal = $('#editPostModal');
  const bpId = editModal.attr('data-current-bp');

  // Send request to delete blog post
  const response = await fetch(`/api/blogPost/${bpId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    document.querySelector('#edit-post-error').textContent = 'An error occured when deleting a post. Try again.';
  }
};

clickablePost.forEach((blogPost) => blogPost.addEventListener('click', populateDataToEdit));
addNewPostBtn.addEventListener('click', addNewPost);
editPostBtn.addEventListener('click', editBlogPost);
deletePostBtn.addEventListener('click', deleteBlogPost);
