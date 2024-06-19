<script setup>
import { defineProps } from 'vue';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

const props = defineProps(['name', 'email', 'position', 'master', 'id']);

const deleteAdmin = async (id) => {
    const confirmed = confirm(`Are you sure you want to delete ${props.name}?`);

    if (confirmed) {
        try {
            await deleteDoc(doc(db, "adminUsers", id));
            console.log('Document successfully deleted:', id);
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    } else {
        console.log('Deletion canceled.');
    }
};
</script>

<template>
    <li class="admin-unit-container">
        <p>{{ props.name }}</p> -
        <p>{{ props.email }}</p>
        <p>{{ props.position }}</p>
        <p v-if="props.master">- &#128081;</p>
        <div class="admin-unit-container__buttons">
            <button @click="handleUpdate">&#9881;</button>
            <button @click="deleteAdmin(props.id)">&#xe020;</button> <!-- Delete button -->
        </div>
    </li>
</template>

<style>
@import '@/assets/style/AdminRow.scss';
</style>
