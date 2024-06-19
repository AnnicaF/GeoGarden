<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const email = ref('');
const password1 = ref('');
const password2 = ref('');
const name = ref('');
const position = ref('');
const master = ref(false);

const handleSubmit = async () => {
    const confirmed = confirm(`Are you sure you want to create an admin with email: ${email.value}?`);

    if (confirmed) {
        try {
            if (!email.value || !password1.value || !password2.value || !name.value || !position.value) {
                alert('Please fill out all fields.');
                return;
            }

            if (password1.value !== password2.value) {
                alert('Passwords do not match.');
                return;
            }

            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password1.value);
            const user = userCredential.user;

            await addDoc(collection(db, 'adminUsers'), {
                uid: user.uid, // Store the user's UID in Firestore
                name: name.value,
                position: position.value,
                email: email.value,
                master: master.value
            });

            email.value = '';
            password1.value = '';
            password2.value = '';
            name.value = '';
            position.value = '';
            master.value = false;

        } catch (error) {
            console.error('Error signing up:', error.message);
            alert(`Error signing up: ${error.message}`);
        }
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password1" type="password" placeholder="Password" required>
        <input v-model="password2" type="password" placeholder="Confirm Password" required>
        <input v-model="name" type="text" placeholder="Name" required>
        <input v-model="position" type="text" placeholder="Position" required>
        <label>
            <input v-model="master" type="checkbox">
            Master
        </label>
        <button type="submit">Create</button>
    </form>
</template>
