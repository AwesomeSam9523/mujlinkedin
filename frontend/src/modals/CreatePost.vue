<template>
  <div class="modal">
    <div class="heading">
      <div class="info">
        <div class="pfp">
          <img :src="userData?.profilePicture" alt="profile picture" />
        </div>
        <div class="text">
          Posting as <b>{{ userData?.displayName }}</b>
        </div>
      </div>
      <div class="close" @click="close">
        <!-- <i class="fa-solid fa-rectangle-xmark"></i> -->
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="form">
      <div class="input">
        <textarea id="description" placeholder="So what are we talking about today?"></textarea>
      </div>
    </div>
    <div class="buttons">
      <div class="left">
        <button class="icon" @click="addImage">
          <i class="fa-solid fa-mountain-sun"></i>
        </button>
        <button class="icon" @click="addMention">
          <i class="fa-solid fa-at"></i>
        </button>
      </div>
      <div class="right">
        <button class="create" @click="createPost">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service';
/* eslint-disable no-unused-vars */
import { closeModal } from "jenesius-vue-modal"

export default {
  name: 'CreatePost',
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    document.getElementById('description').focus();
  },
  methods: {
    async createPost() {
      const description = document.getElementById('description').value;
      const data = {
        description: description,
        mediaUrl: null,
        mentions: [],
      };
      const { response } = await service.post('/post/create', data);
      console.log(response);
      await closeModal();
    },
    async close() {
      console.log('closing');
      await closeModal();
    }
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
.modal {
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  border-radius: 10px;
  background-color: #fff;
  color: black;
}

.heading {
  font-family: 'Comfortaa', monospace;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.pfp {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}

.pfp img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close {
  font-size: 2rem;
  align-self: flex-start;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0.5rem;
  width: 100%;
  height: 85%;
}

.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 1rem;
  width: 100%;
  height: 100%;
}

label {
  font-family: 'PT Mono', monospace;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

input {
  width: 20rem;
  height: 2rem;
  padding: 0.5rem;
}

textarea {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', monospace;
  font-size: 1.35rem;
  padding: 0.5rem;
  line-height: 2rem;
  resize: none;
  border: none;
  outline: none;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
}

button {
  font-family: 'PT Mono', monospace;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;
}

.left {
  display: flex;
  flex-direction: row;
}

.create {
  font-family: 'Roboto', monospace;
  background-color: #000;
  color: #fff;
  font-size: 1.5rem;
}

.create:hover {
  background-color: #fff;
  color: #000;
}

.icon {
  background-color: #fff;
  color: #000;
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.icon:hover {
  background-color: #000;
  color: #fff;
  border-radius: 50%;
}
</style>