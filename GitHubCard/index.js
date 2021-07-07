const entryPoint = document.querySelector('.cards')
axios.get('https://api.github.com/users/hiterharris/followers')
.then(response => {
  const users = response.data.map(user => user);
  return users;
})
.then(result => {
  result.forEach(api => {
    axios.get(api.url)
    .then( response => {
      const newCard = Cards(response);
      entryPoint.appendChild(newCard);
    })
  })
})
.catch( error => {
  console.log('Data not returned', error);
});

function Cards(response) {
  const data = response.data;
  const cards = document.querySelector('.cards');

  const card = document.createElement('div');
  card.classList.add('card');
  cards.appendChild(card);

  const userImg = document.createElement('img');
  userImg.src = data.avatar_url;
  card.appendChild(userImg);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = data.login;
  cardInfo.appendChild(name);

  const userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = data.login;
  cardInfo.appendChild(userName);

  const location = document.createElement('p');
  location.textContent = 'Location: ';
  cardInfo.appendChild(location);

  const profile = document.createElement('p');
  profile.textContent = 'Profile: ';
  cardInfo.appendChild(profile);

  const gitHub = document.createElement('a');
  gitHub.href = data.html_url;
  gitHub.textContent = `${data.html_url}`;
  profile.appendChild(gitHub);

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${data.followers}`;
  cardInfo.appendChild(followers);

  const following = document.createElement('p');
  following.textContent = `Following: ${data.following}`;
  cardInfo.appendChild(following);

  const bio = document.createElement('p');
  bio.textContent = `Bio: ${data.bio}` ;
  cardInfo.appendChild(bio);

  return card;
}

Cards();
