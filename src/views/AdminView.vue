<script setup>
import LoginForm from '../components/LoginForm.vue';
import AdminNavigation from '@/components/AdminNavigation.vue';
import NewsletterEditor from '../components/NewsletterEditor.vue'

import { onSignOut, stateChange } from '../services/authService';
import { ref } from 'vue';

const user = ref(null)

stateChange((userData) => {
    user.value = userData;
})

</script>

<template>
    <AdminNavigation />
    <LoginForm v-if="!user" />

    <div v-else>
        <NewsletterEditor />
    </div>
</template>