<template>
  <router-link :to="'/stations/details/'+station._id" class="station-preview">
  {{station.name}}
  </router-link>
</template>

<script>
export default {
  props:['station'],
}
</script>
