<template>
  <div class="modal">
    <div class="left">
      <div class="field degree">
        <b>Degree:</b> {{ userData?.degree }}
      </div>
      <div class="field email">
        <b>Email:</b> {{ userData?.email.toLowerCase().split('@')[0] }}
      </div>
      <div class="field email">
        <b>Year/Sem:</b> {{ getYearText(userData?.year) }} / {{ userData?.semester == 1 ? 'I' : 'II' }} Semester
      </div>
      <div class="divider2"></div>
      <div class="clubs" v-if="userClubs.length > 0">
        <label class="clubs-head">Clubs:</label>
        <div class="club" v-for="(item, key) in userClubs" :key="key">
          <div class="logo">
            <img :src="clubsData[item.clubName].logo" alt="club logo" />
          </div>
          <div class="details">
            {{ clubsData[item.clubName].name }} ({{ roles[item.role] }})
          </div>
        </div>
      </div>
      <div class="no-club" v-else>
        <label class="no-club-text">No clubs? Join these instead:</label>
        <div class="club" v-for="(item, key) in allClubs" :key="key">
          <div class="logo">
            <img :src="clubsData[item].logo" alt="club logo" />
          </div>
          <div class="details">
            {{ clubsData[item].name }}
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="right">
      <div class="pfp">
        <img :src="userData?.profilePicture" alt="profile picture" />
      </div>
      <div class="name">
        {{ userData?.displayName }} <span class="pronouns" v-if="userData?.gender">({{ getUserPronouns(userData?.gender)
        }})</span>
      </div>
      <div class="bio">
        {{ userData?.bio }}
      </div>
      <div class="divider2"></div>
      <div class="buttons" v-if="notMe">
        <div class="connect" @click="sendConnectRequest">
          <i class="fa-solid fa-user-plus"></i>
          <label class="connect-text">Connect</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service';

export default {
  name: 'UserProfile',
  data() {
    return {
      clubsData: {
        randomize: { motto: 'Godspeed', name: 'Randomize();', logo: 'https://i.imgur.com/O2xikNY.png' },
        acm: { motto: 'Lets code together', name: 'ACM', logo: '' },
        ieee: { motto: 'No code left untouched', name: 'IEEE', logo: '' },
        litmus: { motto: 'MUN Enthusiasts', name: 'Litmus', logo: 'https://cdn.pixabay.com/photo/2023/02/28/12/41/letter-7820764_1280.png' },
        enactus: { motto: 'Entrepreneurship for a better world', name: 'Enactus', logo: '' },
      },
      roles: {
        wt: 'Working Team',
        core: 'Core Team',
        member: 'Member',
        president: 'President',
      },
      userClubs: [],
      allClubs: ['randomize', 'acm', 'ieee', 'litmus', 'enactus'],
      userData: null,
    }
  },
  async created() {
    const userId = this.$route.params.userId;
    const { data: userData } = await service.get('/user/' + userId);
    this.userData = userData;

    const { data: userClubs } = await service.post('/user/clubs', { userId });
    this.userClubs = userClubs;
  },

  computed: {
    notMe() {
      if (!this.userData) return false;
      return this.userData.userId != localStorage.getItem('userId');
    }
  },
  methods: {
    getUserPronouns(gender) {
      if (gender === 'M') {
        return 'He/Him';
      } else {
        return 'She/Her';
      }
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
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  background-color: rgb(18, 18, 18);
  display: flex;
  flex-direction: row;
}

.left {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.5rem;
  padding: 3%;
}

.right {
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3%;
}

.divider {
  width: 1px;
  height: 90%;
  margin-top: 3%;
  background-color: white;
}

.field {
  margin-bottom: 0.65rem;
}

.pfp {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
}

.pfp img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-top: 1rem;
}

.pronouns {
  font-size: 1rem;
  color: rgb(177, 177, 177);
}

.bio {
  font-size: 1rem;
  color: rgb(177, 177, 177);
  margin-top: 1rem;
  align-self: flex-start;
}

.divider2 {
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 1rem 0;
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

.no-club {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.no-club-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.connect {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: rgb(18, 18, 18);
  border: 1px solid white;
  cursor: pointer;
}

.connect i {
  font-size: 1.5rem;
  color: white;
  margin-right: 0.5rem;
}

.connect-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
}
</style>