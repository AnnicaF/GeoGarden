<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { admin } from '../stores/store.js'

const email = ref('');
const password1 = ref('');
const password2 = ref('');
const name = ref('');
const position = ref('');
const master = ref(false);

const dummyUsers = [
    { email: 'mn@geografiskhave.dk', name: 'Morten Nielsen', position: 'Park Manager' },
    { email: 'sa@geografiskhave.dk', name: 'Sofie Andersen', position: 'Botanist' },
    { email: 'lj@geografiskhave.dk', name: 'Lars Jensen', position: 'Horticulturist' },
    { email: 'eh@geografiskhave.dk', name: 'Emilie Hansen', position: 'Garden Designer' },
    { email: 'kp@geografiskhave.dk', name: 'Kasper Pedersen', position: 'Groundskeeper' },
    { email: 'ar@geografiskhave.dk', name: 'Anna Rasmussen', position: 'Event Coordinator' },
    { email: 'hk@geografiskhave.dk', name: 'Henrik Kristensen', position: 'Plant Pathologist' },
    { email: 'jm@geografiskhave.dk', name: 'Julie Madsen', position: 'Educational Officer' },
    { email: 'fs@geografiskhave.dk', name: 'Frederik Sørensen', position: 'Greenhouse Manager' },
    { email: 'ct@geografiskhave.dk', name: 'Camilla Thomsen', position: 'Visitor Services Manager' },
];


// const createDummyUsers = async () => {


//     const auth = getAuth();
//     const password = 'password123';

//     try {
//         for (let i = 0; i < dummyUsers.length; i++) {
//             const userData = dummyUsers[i];
//             const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
//             const user = userCredential.user;

//             await addDoc(collection(db, 'adminUsers'), {
//                 uid: user.uid,
//                 name: userData.name,
//                 position: userData.position,
//                 email: userData.email,
//                 master: i < 3 // Assign the first 3 users as masters
//             });

//             console.log(`User created: ${userData.email}`);
//         }
//         console.log('All dummy users created successfully.');
//     } catch (error) {
//         console.error('Error creating dummy users:', error.message);
//         alert(`Error creating dummy users: ${error.message}`);
//     }
// };

// onMounted(createDummyUsers);

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
    <form @submit.prevent="handleSubmit" class="form-container">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password1" type="password" placeholder="Password" required>
        <input v-model="password2" type="password" placeholder="Confirm Password" required>
        <input v-model="name" type="text" placeholder="Name" required>
        <input v-model="position" type="text" placeholder="Position" required>
        <label>
            <input v-model="master" type="checkbox" class="form-container__checkbox">
            Master
        </label>
        <button :disabled="!admin.value" type="submit">Create</button>
    </form>
</template>

<style lang="scss" scoped>

    .form-container {
        font-family: "Open Sans", sans-serif;
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: auto;
        margin: 50px 0px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;

        input {
            font-family: "Open Sans", sans-serif;
            padding: 5px;
        }

        button {
            font-family: "Open Sans", sans-serif;
            width: 100px;
            height: 30px;
            margin-left: auto;
            cursor: pointer;
            background-color: green;
            color: white;
            border-color: green;
            transition: 0.2s;
            border-style: solid;
            font-weight: bold;
            
            &:hover {
                background-color: #00000000;
                border-style: solid;
                border-radius: 2px;
                border-width: 2px;
                transition: 0.2s;
                color: green;
            }
        }

        label {
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__checkbox {
            cursor: pointer;
            font-size: 12px;
        }
    }
</style>
