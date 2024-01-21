<template>
  <div class="background">
    <img src="../assets/images/loginBackground.png" class="bg-img" alt="background" />
  </div>
  <div class="content">
    <div class="heading">MUJ LinkedIn</div>
    <div class="main">
      <div class="logos">
        <div class="logo-1"></div>
        <div class="division"></div>
        <div class="logo-2"></div>
      </div>
      <div class="fields">
        <div class="field" v-if="page == 1">
          <label for="username">Full name</label>
          <input type="text" id="name" />
        </div>
        <div class="field" v-if="page == 0 || page == 1">
          <label for="username">Email</label>
          <input type="text" id="email" />
        </div>
        <div class="field" v-if="page == 0 || page == 1">
          <label for="password">Password</label>
          <div class="password-cont">
            <input :type="show ? 'text' : 'password'" id="password" />
            <button class="show-hide" @click="show = !show">
              <i class="fa-solid fa-eye" v-if="show"></i>
              <i class="fa-solid fa-eye-slash" v-else></i>
            </button>
          </div>
        </div>
        <div class="field" v-if="page == 2">
          <label for="username">DOB</label>
          <input type="date" id="dob" />
        </div>
        <div class="field" v-if="page == 2">
          <label for="username">Gender</label>
          <div class="radiobtns">
            <div class="radio">
              <label for="html">Male</label>
              <input type="radio" id="html" name="genderSelection" value="M">
            </div>
            <div class="radio">
              <label for="css">Female</label>
              <input type="radio" id="css" name="genderSelection" value="F">
            </div>
          </div>
        </div>
        <div class="field" v-if="page == 3">
          <label for="username">Skills</label>
          <div class="skills">
            <div v-for="(item, key) in ['skill1', 'skill2', 'skill3', 'skill4', 'skill5']" :key="key" class="skill">
              <label :for="item">{{ key + 1 }}.</label>
              <input type="text" :id="item" />
            </div>
          </div>
        </div>
        <div class="field" v-if="page == 4">
          <label for="username">Clubs</label>
          <div class="clubs">
            <div class="club" v-for="(item, key) in allClubs" :key="key">
              <input type="checkbox" :id="item" />
              <label :for="item">{{ clubsData[item].name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="login" v-if="page == 4" @click="register">Done</button>
        <button class="login" @click="login" v-if="page == 0">Login</button>
        <button class="register" v-if="page == 0" @click="page = 1">Register</button>
        <button class="login" @click="recordAndNext()" v-if="page < 4 && page > 0">Next</button>
        <button class="register" v-if="page != 0" @click="page--">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service';
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  name: 'LoginPage',
  data: function () {
    return {
      show: false,
      isRegistering: false,
      page: 0,
      registeringData: {},
      allClubs: ['randomize', 'ieee', 'acm', 'litmus', 'enactus'],
      clubsData: {
        randomize: { motto: 'Godspeed', name: 'Randomize();', logo: 'https://i.imgur.com/O2xikNY.png' },
        acm: { motto: 'Lets code together', name: 'ACM', logo: '' },
        ieee: { motto: 'No code left untouched', name: 'IEEE', logo: '' },
        litmus: { motto: 'MUN Enthusiasts', name: 'Litmus', logo: 'https://cdn.pixabay.com/photo/2023/02/28/12/41/letter-7820764_1280.png' },
        enactus: { motto: 'Entrepreneurship for a better world', name: 'Enactus', logo: '' },
      },
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
        console.log('set new token login');
        this.$router.push('/feed');
      } catch (error) {
        console.log(error);
      }
    },

    register: async function () {
      try {
        const { name, email, password, dob, gender, skills, clubs } = this.registeringData;
        const { data } = await service.post('/login/new', { name, email, password, dob, gender, skills, clubs });
        const { token } = data;
        localStorage.setItem('token', token);
        console.log('set new token register');
        this.$router.push('/feed');
      } catch (error) {
        console.log(error);
      }
    },

    recordAndNext() {
      switch(this.page) {
        case 1:
          this.registeringData.email = document.getElementById('email').value;
          this.registeringData.password = document.getElementById('password').value;
          this.registeringData.name = document.getElementById('name').value;
          break;
        case 2:
          this.registeringData.dob = document.getElementById('dob').value;
          try {
            this.registeringData.gender = document.querySelector('input[name="genderSelection"]:checked').value;
          } catch (error) {
            toast.error('Please choose gender first.');
            return;
          }
          break;
        case 3:
          this.registeringData.skills = [];
          for (let i = 1; i <= 5; i++) {
            this.registeringData.skills.push(document.getElementById('skill' + i).value);
          }
          break;
        }
      if (this.page == 1) {
        if (!this.registeringData.name) {
          toast.error('Please enter name first.');
          return;
        }

        if (!this.registeringData.email) {
          toast.error('Please enter email first.');
          return;
        }

        if (!this.registeringData.password) {
          toast.error('Please enter password first.');
          return;
        }
      } else if (this.page == 2) {
        if (!this.registeringData.dob) {
          toast.error('Please enter dob first.');
          return;
        }
      }
      this.page++;
    }
  }

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Borel&family=Patua+One&display=swap');
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
  // filter: blur(1px);
}

.content {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  border-radius: 10px;
  padding: 2rem;
  margin-left: 53%;
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
  // border: 1px solid #000;
  border: none;
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
  background-color: #ea7135;
  border: none;
  color: #fff;
}

.register {
  background-color: #fff;
  color: #ea7135;
  border: none;
}

.heading {
  font-family: 'Patua One', monospace;
  font-size: 3rem;
  // font-weight: bold;
  color: #000;
  margin-bottom: 2rem;
  margin-left: 58%;
}

.radiobtns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0.5rem 1rem;
  width: 20rem;
  border-radius: 10px;
}

.radio {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.radio input, .clubs input {
  margin-left: 1rem;
  width: unset;
}

.radio label {
  margin-bottom: 0;
}

.club label {
  margin-bottom: 0;
}

.skills {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.skill {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.skill label {
  margin-right: 1rem;
}

.skill input {
  width: 20rem;
}

.clubs {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.clubs-head {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.club {
  font-size: 1rem;
  color: rgb(177, 177, 177);
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.club .logo {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  // border: 1px solid white;
  margin-right: 0.5rem;
}

.club .logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.club .details {
  font-size: 1rem;
  color: rgb(177, 177, 177);
}
</style>