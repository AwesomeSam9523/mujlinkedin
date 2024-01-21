<template>
<div class="cont">
  <div class="left-bar">
    <div class="logo-cont">
      <div class="logo-text">
        <span>MUJ</span>
        <span>LinkedIn</span>
      </div>
    </div>
    <div class="logo"></div>
    <div class="left-menu">
      <div class="item">
        <div class="icon"><i class="fa-solid fa-tower-broadcast"></i></div>
        <div class="text">Connections</div>
      </div>
      <!-- <div class="item">
        <div class="icon"><i class="fa-solid fa-laptop-code"></i></div>
        <div class="text">Projects</div>
      </div>
      <div class="item">
        <div class="icon"><i class="fa-brands fa-telegram"></i></div>
        <div class="text">Messages</div>
      </div> -->
      <div class="item">
        <div class="icon"><i class="fa-solid fa-bell"></i></div>
        <div class="text">Notifications</div>
      </div>
      <div class="item post-item" @click="createPostModal">
        <div class="icon"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
        <div class="text">Create a Post</div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="search-bar">
      <input type="text" placeholder="Search for people, projects, and more..." @input="search($event.target.value)" />
    </div>
    <div class="campus-news"></div>
    <div class="feed">
      <div class="post" v-for="(item, key) in feed" :key="key">
        <div class="post-top">
          <div class="top-right">
            <div class="post-pfp" @click="viewProfile(item.userId)">
              <img :src="item.profilePicture" alt="profile picture" />
            </div>
            <div class="name-bio-cont">
              <div class="post-name" @click="viewProfile(item.userId)">
                <label>{{ item.displayName }}</label>
              </div>
              <div class="post-bio">
                <label>{{ item.bio }}</label>
              </div>
            </div>
          </div>
          <div class="top-left">
            <div class="post-degree">
              <label>{{ item.degree }} | {{ getYearText(item.year) }}</label>
            </div>
          </div>
        </div>
        <div class="post-divider"></div>
        <div class="post-content">
          <div class="post-text">
            <label>{{ item.description }}</label>
          </div>
        </div>
        <div class="post-divider"></div>
        <div class="post-bottom" :style="{ marginBottom: item.likeCount == 0 ? '0.5rem' : '0px' }">
          <div class="left">
            <button class="post-btn" :class="item.likedByMe ? 'like' : 'unlike'" @click="likeUnlike(item)">
              <i class="fa-solid fa-thumbs-up"></i>
            </button>
            <!-- <button class="post-btn comment">
              <i class="fa-solid fa-comment"></i>
            </button> -->
          </div>
          <div class="right">
            <label>Created {{ getRelativePostDate(item.createdAt) }}</label>
          </div>
        </div>
        <span class="like-count" v-if="item.likeCount != 0">{{ item.likeCount }}</span>
      </div>
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
        <div class="tool" @click="openUserProfile">
          <div class="icon tooltip">
            <i class="fa-solid fa-user"></i>
            <span class="tooltiptext">My Profile</span>
          </div>
        </div>
        <!-- <div class="tool">
          <div class="icon tooltip">
            <i class="fa-solid fa-cog"></i>
            <span class="tooltiptext">Settings</span>
          </div>
        </div> -->
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
/* eslint-disable no-unused-vars */
import { openModal } from "jenesius-vue-modal";
import CreatePost from '@/modals/CreatePost.vue';
// import UserProfile from '@/modals/UserProfile.vue';

export default {
  data() {
    return {
      userData: null,
      feed: [],
      lastInterval: null,
    }
  },
  async created() {
    try {
      const { data } = await service.get('/user');
      this.userData = data;
      localStorage.setItem('userId', data.userId);
      const feedData = await service.get('/post/feed');
      this.feed = feedData.data.posts;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },

    createPostModal() {
      openModal(CreatePost, {
        userData: this.userData,
      });
    },

    getYearText(year) {
      switch (year) {
        case 1:
          return '1st Year';
        case 2:
          return '2nd Year';
        case 3:
          return '3rd Year';
        case 4:
          return '4th Year';
        case 5:
          return '5th Year';
        default:
          return 'Alumni';
      }
    },

    getRelativePostDate(date) {
      // show like 1d ago, 1m ago, 1y ago etc
      const now = new Date();
      const postDate = new Date(date);
      const diff = now - postDate;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      if (years > 0) {
        return `${years}y ago`;
      } else if (months > 0) {
        return `${months}m ago`;
      } else if (days > 0) {
        return `${days}d ago`;
      } else if (hours > 0) {
        return `${hours}h ago`;
      } else if (minutes > 0) {
        return `${minutes}m ago`;
      } else {
        return `${seconds}s ago`;
      }
    },

    likeUnlike(post) {
      if (post.likedByMe) {
        this.unlikePost(post);
      } else {
        this.likePost(post);
      }
    },

    async likePost(post) {
      try {
        await service.post(`/post/like`, { postId: post.postId });
        post.likedByMe = true;
        post.likeCount += 1;
      } catch (err) {
        console.log(err);
      }
    },

    async unlikePost(post) {
      try {
        await service.post(`/post/unlike`, { postId: post.postId });
        post.likedByMe = false;
        post.likeCount -= 1;
      } catch (err) {
        console.log(err);
      }
    },

    viewProfile(userId) {
      this.$router.push(`/profile/${userId}`);
    },

    search(query) {
      if (this.lastInterval) {
        clearTimeout(this.lastInterval);
      }
      this.lastInterval = setTimeout(() => {
        this.searchQuery(query);
      }, 500);
    },

    async searchQuery(query) {
      try {
        const { data } = await service.get(`/search?query=${query}`);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },

    openUserProfile() {
      this.$router.push(`/profile/${this.userData.userId}`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Borel&family=Patua+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
.cont {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-image: url(https://skilloutlook.com/wp-content/uploads/2021/06/Manipal-Jaipur-PhD-2021.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.logo-cont {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5rem;
  margin-left: 5rem;
}

.logo {
  width: 5rem;
  height: 5rem;
  background-image: url('../assets/images/logo-white.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 9rem;
  margin-top: 5rem;
}

.logo-text {
  font-family: "Patua One", monospace;
  font-size: 2.5rem;
  margin-left: 1.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.left-bar {
  width: 15%;
  height: 100%;
}

.main {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 2rem;
}

.right-bar {
  width: 15%;
  height: 100%;
  background-color: #f5a044d1;
  color: #000;
  transition: all 0.2s ease-in-out;
}

.right-bar.show {
  transform: translate(0%);
  transition: all 0.2s ease-in-out;
}

.icon {
  width: 2.75rem;
}

.left-menu {
  margin-left: 2.75rem;
  // margin-top: 60%;
}

.item {
  width: fit-content;
  text-wrap: nowrap;
  font-family: "Patua One", monospace;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 6rem;
  margin: 0.5rem 0;
  padding: 0 1rem 0 0.5rem;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.item:hover {
  background-color: #565656;
  // color: #000;
  border-radius: 20px;
}

.post-item {
  flex-direction: column-reverse;
  height: 8rem;
  justify-content: flex-end;
  margin-left: 2rem;
  margin-top: 2rem;
}

.post-item .icon {
  margin-top: 1rem;
  font-size: 3.5rem;
}

.icon, .text {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
}

.notifications {
  margin-left: 0.75rem;
  margin-top: 2rem;
}

.column-heading {
  font-family: 'Patua One', monospace;
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

.post-pfp {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.post-pfp img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid #fff;
}

.name {
  margin-top: 0.675rem;
  font-size: 1.5rem;
}

.post-name {
  // margin-left: 0.675rem;
  font-family: 'Patua One';
  font-size: 1.75rem;
  cursor: pointer;
}

.post-name label {
  cursor: pointer;
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
  text-align: left;
}

.search-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}

.search-bar input {
  width: 80%;
  height: 2.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  font-family: "Lato", monospace;
  font-weight: 400;
  font-size: 1rem;
  outline: none;
  border: none;
  background-color: #ffffff8c;
  color: black;
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

.feed {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 3rem;
}

.post {
  width: 80%;
  max-height: 30rem;
  background-color: #2525259c;
  margin-bottom: 2rem;
  color: #f1f1f1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.like-count {
  align-self: flex-start;
  margin-left: 8.5%;
}

.post-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // padding: 1rem;
  margin: 0.75rem 5%;
}

.top-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.top-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.post-degree {
  font-family: 'Lato', monospace;
  font-weight: bolder;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-align: left;
}

.post-divider {
  width: 90%;
  margin-left: 5%;
  height: 1px;
  background-color: #fff;
}

.name-bio-cont {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1rem;
}

.post-bio {
  font-weight: 300;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: #c5c5c5;
  text-align: left;
}

.post-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem;
}

.post-text {
  font-family: 'Roboto', monospace;
  line-height: 2rem;
  width: 90%;
  text-align: left;
  font-size: 1.5rem;
}

.post-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 5%;
}

.left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.post-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.post-btn:hover {
  background-color: #000;
  color: #fff;
}

.unlike {
  background-color: #fff;
  color: #000;
}

.like {
  background-color: #000;
  color: #fff;
}

</style>