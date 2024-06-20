<script setup>
import { defineProps } from 'vue';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { admin, modal} from '../stores/store.js'

const props = defineProps(['name', 'email', 'position', 'master', 'id', 'editId']);

const deleteAdmin = async (id) => {
    const confirmed = confirm(`Are you sure you want to delete ${props.name}?`);

    if (confirmed) {
        try {
            await deleteDoc(doc(db, "adminUsers", id));
            console.log('Document successfully deleted:', id);
            window.location.reload()
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    } else {
        console.log('Deletion canceled.');
    }
};

const updateAdmin = (id, n, e, p, m) => {
    modal.openModal(id, n, e, p, m)
}

</script>

<template>
    <li class="admin-unit-container">
        <p>{{ props.name }}</p> -
        <p>{{ props.email }}</p> -
        <p>{{ props.position }}</p>
        <p v-if="props.master">- &#128081;</p>
        <div class="admin-unit-container__buttons">
            <button class="admin-unit-container__buttons--edit" :disabled="!admin.value" @click="updateAdmin(props.editId, props.name, props.email, props.position, props.master)">Edit</button>
            <button class="admin-unit-container__buttons--delete" :disabled="!admin.value" @click="deleteAdmin(props.id)">Delete</button>
        </div>
    </li>
</template>

<style>
@import '@/assets/style/AdminRow.scss';

button:disabled {
    opacity: 0.2;
}

</style>
