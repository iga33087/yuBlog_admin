<template>
  <div class="leftMenu">
    <div class="leftMenuBox">
      <router-link :to="{name:'Articles'}" class="leftMenuBoxItem">
        <div class="leftMenuBoxItemTitle">Articles</div>
      </router-link>
      <router-link :to="{name:'Classtypes'}" class="leftMenuBoxItem">
        <div class="leftMenuBoxItemTitle">Classtypes</div>
      </router-link>
      <router-link :to="{name:'Tags'}" class="leftMenuBoxItem">
        <div class="leftMenuBoxItemTitle">Tags</div>
      </router-link>
      <router-link :to="{name:'Members'}" class="leftMenuBoxItem">
        <div class="leftMenuBoxItemTitle">Members</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>