<script setup>
import { ref } from 'vue';
import { signIn } from '../services/authService';
import { useRouter } from "vue-router";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const router = useRouter();
const resetPassRoute = router.getRoutes().find(route => route.name === 'password-reset');
const email = ref('')
const password = ref('')
const userEmailArray = ref([]);

const fetchCollection = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'adminUsers'));
        const emailArray = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            emailArray.push(data.email);
        });

        userEmailArray.value = emailArray;
        console.log(userEmailArray.value);

    } catch (err) {
        console.error('Error fetching collection:', err);
    }
};

const onSubmitForm = async () => {
    try {
        await fetchCollection();

        if (userEmailArray.value.includes(email.value)) {
            const user = await signIn(email.value, password.value);
            console.log("User found:", user.uid);
        } else {
            alert("No user with that email found")
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};

const redirectToResetPassword = () => {
    router.push({ name: 'password-reset', query: { email: email.value } });
}

</script>

<template>
    <div class="login-form-container">
        <form @submit.prevent="onSubmitForm" class="login-form-inputs">
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Sign In</button>
            <a @click="redirectToResetPassword"> {{ resetPassRoute.meta.title }}</a>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import url(../assets/style/LoginForm.scss);
</style>
