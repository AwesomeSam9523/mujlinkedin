<template>
  <div class="main">
    <loading-icon />
    <label class="text">Loading...</label>
  </div>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon.vue'
import service from '@/service';

export default {
  components: {
    LoadingIcon
  },
  name: 'LandingPage',
  mounted: async function () {
    try {
      const { response } = await service.get('/verify');
      console.log(response);
      if (response.success)
        this.$router.push('/feed');
    } catch (error) {
      console.error(error);
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.text {
  font-family: 'PT Mono', monospace;
  font-size: 2rem;
  margin-left: 1rem;
}
</style>