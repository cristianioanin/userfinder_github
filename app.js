// Instatiate GitHub object
const github = new GitHub();

// Instantiate UI object
const ui = new UI();

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', e => {
  // Get input text
  const userText = e.target.value;

  if (userText !== '') {
    // Make API call
    github.getUser(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          // UI Show alert
          ui.showAlert('Username not found...', 'alert alert-danger');
          ui.clearProfile();
        } else {
          // UI Clear alert (if any)
          ui.clearAlert();
          // UI Show profile
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      });
  } else {
    // UI Clear alert (if any)
    ui.clearAlert();
    // UI Clear profile
    ui.clearProfile();
  }
});