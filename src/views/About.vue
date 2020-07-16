<template>
  <div class="about">
    <h1>About Us</h1>
    <ul class="creator-list container">
      <li class="itamar flex justify-center align-center">
        <img src="../assets/creator pictures/itamar.jpg" alt="creator image">
        <div class="creator-info">
          <h3>Itamar Joseph</h3>
          <p>A full stack web developer.Graduated at MisterBit Coding Academy. Experience with: Vue.js, React, Angular, Javascript, HTML, CSS, SASS, Node.js, Mongo.db.</p>
          <p>Hobbies: Nature, computer games</p>
          <section class="social-about">
      <a href="https://www.linkedin.com/in/itamar-joseph-6a3b8b1b0/">
       <font-awesome-icon size="lg"  :icon="['fab','linkedin']" class="icon linkedin-icon"/>
      </a>
             <a href="https://www.facebook.com/profile.php?id=100000008839584">
               <font-awesome-icon size="lg"  :icon="['fab','facebook-square']" class="icon facebook-icon"/>
            </a>
            <a href="https://github.com/Itamar80">
              <font-awesome-icon size="lg"  :icon="['fab','github']" class="icon github-icon"/>
            </a>

        </section>
        </div>
      </li>
      <li class="Nir flex justify-center align-center">
        <img src="../assets/creator pictures/itamar.jpg" alt="creator image">
        <div class="creator-info">
          <h3>Nir Druckman</h3>
          <p>A full stack web developer.Graduated at MisterBit Coding Academy. Experience with: Vue.js, React, Angular, Javascript, HTML, CSS, SASS, Node.js, Mongo.db.</p>
          <p>Hobbies: Nature, computer games</p>
          <section class="social-about">
        <font-awesome-icon size="lg"  :icon="['fab','linkedin']" class="icon linkedin-icon"/>
            <a href="">
               <font-awesome-icon size="lg"  :icon="['fab','facebook-square']" class="icon facebook-icon"/>
            </a>
            <font-awesome-icon size="lg"  :icon="['fab','github']" class="icon github-icon"/>

        </section>
        </div>
      </li>
      <li class="Naomi flex justify-center align-center">
        <img src="../assets/creator pictures/itamar.jpg" alt="creator image">
        <div class="creator-info">
          <h3>Naomi Elkayam</h3>
          <p>A full stack web developer.Graduated at MisterBit Coding Academy. Experience with: Vue.js, React, Angular, Javascript, HTML, CSS, SASS, Node.js, Mongo.db.</p>
          <p>Hobbies: Nature, computer games</p>
          <section class="social-about">
       <font-awesome-icon size="lg"  :icon="['fab','linkedin']" class="icon linkedin-icon"/>
       <font-awesome-icon size="lg"  :icon="['fab','facebook-square']" class="icon facebook-icon"/>
        <font-awesome-icon size="lg"  :icon="['fab','github']" class="icon github-icon"/>

        </section>
        </div>
      </li>
     
    </ul>
    <p class="cofferights">copyright © Nir, Naomi, Itamar 2020</p>
     <!-- <font-awesome-icon size="lg" :icon="['far', 'clock']" class="clock-icon"/> -->
  </div>
</template>



<script>
import moment from 'moment';
import {fontAwsomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
 
library.add(faLinkedin)
library.add(faFacebookSquare)
library.add(faGithub)

export default {
  name:'about-page',
  data(){
    return {
    }
  },
  created(){
  },
  computed:{
  },
  methods:{
  },
  components:{
    fontAwsomeIcon
  }
}
</script>
