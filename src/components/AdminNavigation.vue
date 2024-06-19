<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onSignOut } from '../services/authService'; // Adjust this path according to your project structure

const auth = getAuth();
const loggedInUserEmail = ref(null);

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loggedInUserEmail.value = user.email;
        } else {
            loggedInUserEmail.value = null; // Reset if no user is logged in
        }
    });
});
</script>

<template>
    <nav>
        <template v-if="loggedInUserEmail">
            <p class="logged-in-as">{{ loggedInUserEmail }}</p>
            <a href="/admin">Newsletter</a>
            <a href="/controlpanel">Controlpanel</a>
            <button @click="onSignOut">Sign Out</button>
        </template>

        <template v-else>
            <a href="/">Back to website</a>
        </template>
    </nav>
</template>

<style lang="scss">
@import url(../assets/style/AdminNavigation.scss);
</style>