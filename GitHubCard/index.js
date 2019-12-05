axios.get('https://api.github.com/users/hiterharris/followers')

.then(response => {
  const users = response.data.map(user => user);
  return users;
})

.then(result => {
  result.forEach(api => {
    axios.get(api.url)
    .then( response => {
      const followerCount = api.followers_url.length;
      const followingCount = api.following_url.length;
      const newCard = Cards(response, followerCount, followingCount);
      entryPoint.appendChild(newCard);
    })
  })
})

.catch( error => {
  console.log('Data not returned', error);
});

const entryPoint = document.querySelector('.cards')

function Cards(response, followerCount, followingCount) {

  // CREATING ELEMENTS
  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const gitHub = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // CREATING CLASS NAMES
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  // PASSING DATA INTO FUNCTION
  const data = response.data;
  userImg.src = data.avatar_url;
  name.textContent = data.login;
  userName.textContent = data.login;
  location.textContent = 'Location: ';
  profile.textContent = 'Profile: ';
  gitHub.href = `Profile: ${data.html_url}`;
  gitHub.textContent = `${data.html_url}`;
  followers.textContent = `Followers: ${followerCount}`;
  following.textContent = `Following: ${followingCount}`;
  bio.textContent = 'Bio: ' ;


  const cards = document.querySelector('.cards');
  cards.appendChild(card);
  card.appendChild(userImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(gitHub);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}

Cards();
