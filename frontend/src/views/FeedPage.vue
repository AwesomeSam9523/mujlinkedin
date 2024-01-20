<template>
<div class="cont">
  <div class="left-bar">
    <div class="logo-cont">
      <div class="logo"></div>
      <div class="logo-text">MUJ LinkedIn</div>
    </div>
    <div class="left-menu">
      <div class="item">
        <div class="icon"><i class="fa-solid fa-tower-broadcast"></i></div>
        <div class="text">Connections</div>
      </div>
      <div class="item">
        <div class="icon"><i class="fa-solid fa-laptop-code"></i></div>
        <div class="text">Projects</div>
      </div>
      <div class="item">
        <div class="icon"><i class="fa-brands fa-telegram"></i></div>
        <div class="text">Messages</div>
      </div>
      <div class="item">
        <div class="icon"><i class="fa-solid fa-bell"></i></div>
        <div class="text">Notifications</div>
      </div>
      <div class="item post">
        <div class="icon"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
        <div class="text">Create a Post</div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="search-bar">
      <input type="text" placeholder="Search for people, projects, and more..." />
    </div>
  </div>
  <div class="right-bar">
    <div class="profile-cont">
      <div class="pfp">
        <img :src="userData?.profilePicture" alt="profile picture" />
      </div>
      <div class="name">
        <label>{{ userData?.displayName }}</label>
      </div>
      <div class="degree">
        <label>{{ userData?.degree }}</label>
      </div>
      <div class="tools">
        <div class="tool">
          <div class="icon tooltip">
            <i class="fa-solid fa-user"></i>
            <span class="tooltiptext">My Profile</span>
          </div>
        </div>
        <div class="tool">
          <div class="icon tooltip">
            <i class="fa-solid fa-cog"></i>
            <span class="tooltiptext">Settings</span>
          </div>
        </div>
        <div class="tool" @click="logout">
          <div class="icon tooltip">
            <i class="fa-solid fa-sign-out"></i>
            <span class="tooltiptext">Logout</span>
          </div>
          <!-- <div class="text">Logout</div> -->
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="club-cont">
      <div class="heading">Club News ✨</div>
      <div class="articles">
        <div class="article">
          ● Randomize(); organizes 36 hour long hackathon!
        </div>
        <div class="article">
          ● Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import service from '@/service';

export default {
  data() {
    return {
      userData: null,
    }
  },
  async created() {
    try {
      const { data } = await service.get('/user');
      this.userData = data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Borel&family=Patua+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
.cont {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.logo-cont {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  width: 5rem;
  height: 5rem;
  background-image: url('../assets/images/logo-white.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.logo-text {
  font-family: 'Patua One', monospace;
  font-size: 1.75rem;
  margin-left: 0.5rem;
  color: #fff;
}

.left-bar {
  width: 15%;
  height: 100%;
  background-color: #000;
}

.main {
  width: 70%;
  height: 100%;
  background-color: #181818;
  display: flex;
  flex-direction: column;
}

.right-bar {
  width: 15%;
  height: 100%;
  background-color: #000;
}

.icon {
  width: 2.75rem;
}

.left-menu {
  margin-left: 0.75rem;
  margin-top: 60%;
}

.item {
  width: fit-content;
  font-family: 'Borel', monospace;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  margin: 0.5rem 0;
  padding: 0 1rem 0 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.item:hover {
  background-color: #565656;
  // color: #000;
  border-radius: 20px;
}

.icon, .text {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.text {
  padding-top: 1rem;
}

.post {
  background-color: #000;
  color: #fff;
}

.notifications {
  margin-left: 0.75rem;
  margin-top: 2rem;
}

.column-heading {
  font-family: 'Borel', monospace;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  margin: 0.5rem 0;
  padding: 0 1rem 0 0.5rem;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
}

.profile-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pfp {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.pfp img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid #F48A46;
}

.name {
  margin-top: 0.675rem;
  font-size: 1.5rem;
}

.degree {
  margin-top: 0.275rem;
  background-color: #F48A46;
  width: fit-content;
  color: #000;
  padding: 0.25rem;
  border-radius: 10px;
}

.tools {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.tool {
  transition: all 0.1s linear;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.tool:hover {
  background-color: #ffffff55;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin-top: 1rem;
}

.heading {
  font-family: 'Patua One', monospace;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-left: 1rem;
  color: #fff;
}

.articles {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 1rem;
  margin-left: 1rem;
}

.article {
  font-family: 'Lato', monospace;
  font-weight: 300;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-align: left;
}

.search-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.search-bar input {
  width: 75%;
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 0.5rem;
  font-family: 'Lato', monospace;
  font-weight: 400;
  font-size: 1rem;
  color: #fff;
  background-color: #000;
}

.tooltip {
  position: relative;
  display: inline-block;
  // border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext {
  width: 120px;
  top: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
}

</style>