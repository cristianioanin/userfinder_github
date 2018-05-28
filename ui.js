class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company === null ? 'N/A' : user.company}</li>
              <li class="list-group-item" id="anchor">Website: ${user.blog === '' ? 'N/A' : ''}</a></li>
              <li class="list-group-item">Location: ${user.location === null ? 'N/A' : user.location}</li>
              <li class="list-group-item">Member since: ${(user.created_at).substr(0, 10)}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repositories</h3>
      <div id="repos"></div>
    `;

    this.anchorLink(user.blog);
  }

  showRepos(repos) {
    let output = '';

    repos.forEach(repo => {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById('repos').innerHTML = output;
  }

  showAlert(message, className) {
    // Clear previous alert (if any)
    this.clearAlert();
    // Create a <div> element to append the alert message
    const div = document.createElement('div');
    // Add class - it will be provided as an argument
    div.className = className;
    // Append text node to the <div> element
    div.appendChild(document.createTextNode(message));
    // Get a parent a a child to insert the newly created div
    const container = document.querySelector('.searchContainer');

    // const search = document.querySelector('.search');
    // Insert the alert <div> element relative to the above elements
    // container.insertBefore(div, search);

    // Append as child of the container element (looks better, I think)
    container.appendChild(div);
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  anchorLink(link) {
    if (!link) return null;
    const aLink = link.includes('http://') || link.includes('https://') ? link : 'http://' + link;

    const anchorHTML = `
      <a href="${aLink}" target="_blank">${aLink}</a>
    `;
    const liElement = document.getElementById('anchor');
    liElement.insertAdjacentHTML('beforeend', anchorHTML);
  }
}