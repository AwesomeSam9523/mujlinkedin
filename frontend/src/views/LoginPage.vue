<template>
  <div class="background">
    <img src="../assets/images/loginBackground.webp" class="bg-img" alt="background" />
  </div>
  <div class="content">
    <div class="main">
      <div class="logos">
        <div class="logo-1"></div>
        <div class="division"></div>
        <div class="logo-2"></div>
      </div>
      <div class="fields">
        <div class="field" v-if="isRegistering">
          <label for="username">Full name</label>
          <input type="text" id="name" />
        </div>
        <div class="field">
          <label for="username">Email</label>
          <input type="text" id="email" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <div class="password-cont">
            <input :type="show ? 'text' : 'password'" id="password" />
            <button class="show-hide" @click="show = !show">
              <i class="fa-solid fa-eye" v-if="show"></i>
              <i class="fa-solid fa-eye-slash" v-else></i>
            </button>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="login" v-if="isRegistering" @click="isRegistering = false">Back</button>
        <button class="login" @click="login" v-else>Login</button>
        <button class="register" v-if="isRegistering" @click="register">Done</button>
        <button class="register" v-else @click="isRegistering = true">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service';

export default {
  name: 'LoginPage',
  data: function () {
    return {
      show: false,
      isRegistering: false,
    }
  },
  methods: {
    login: async function () {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const { data } = await service.post('/login', { email, password });
        const { token } = data;
        localStorage.setItem('token', token);
        this.$router.push('/feed');
      } catch (error) {
        console.log(error);
      }
    },

    register: async function () {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const { data } = await service.post('/login/new', { name, email, password});
        const { token } = data;
        localStorage.setItem('token', token);
        this.$router.push('/profile');
      } catch (error) {
        console.log(error);
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
}

.content {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  align-items: center;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  border-radius: 10px;
  padding: 2rem;
  margin-left: 5%;
  background-color: #0000001f;
}

.logos {
  display: flex;
  flex-direction: row;
}

.division {
  width: 1px;
  height: 10rem;
  background-color: #000;
  margin: 0 2rem;
}

.logo-1 {
  width: 10rem;
  height: 10rem;
  background-image: url('../assets/images/logo.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.logo-2 {
  width: 10rem;
  height: 10rem;
  background-image: url('../assets/images/dplinkedin.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fields {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 1rem;
}

label {
  font-family: 'PT Mono', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #000;
}

input {
  font-family: 'PT Mono', monospace;
  font-size: 1.25rem;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 0.5rem;
  width: 20rem;
  outline: none;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

button {
  font-family: 'PT Mono', monospace;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #000;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
}

.password-cont {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.show-hide {
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  position: absolute;
  right: 0;
  margin: 0;
  padding: 0 0.5rem;
}

.login {
  background-color: #000;
  color: #fff;
}

.register {
  background-color: #fff;
  color: #000;
}


</style>