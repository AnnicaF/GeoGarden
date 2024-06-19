<script setup>
import { modal } from '../stores/store.js';
import { ref, watchEffect } from 'vue';
import { db } from '@/firebase';
import { updateDoc, query, where, getDocs, collection } from "firebase/firestore";

const nameInEdit = ref('');
const emailInEdit = ref('');
const positionInEdit = ref('');
const masterInEdit = ref(false);

watchEffect(() => {
  nameInEdit.value = modal.name;
  emailInEdit.value = modal.email;
  positionInEdit.value = modal.position;
  masterInEdit.value = modal.master;
});

const closeModal = () => {
  modal.modalValue = false;
};

const updateAdmin = async () => {
    console.log(modal.id);
    const adminsRef = collection(db, 'adminUsers'); // Reference to 'adminUsers' collection
    const querySnapshot = await getDocs(query(adminsRef, where("uid", "==", modal.id)));


    querySnapshot.forEach(async (doc) => {
        try {
            await updateDoc(doc.ref, {
                name: nameInEdit.value,
                email: emailInEdit.value,
                position: positionInEdit.value,
                master: masterInEdit.value
            });

            console.log("Document successfully updated!");
            window.location.reload()

        } catch (error) {
            console.error("Error updating document: ", error);
        }
    });
};
</script>

<template>
    <div class="dialog-overlay" v-if="modal.modalValue">
        <dialog open>
            <button class="close-button" @click="closeModal">Close</button>
            <form @submit.prevent="updateAdmin">
                <div class="edit-input-container">
                    <input type="text" v-model="nameInEdit" placeholder="Name">
                    <input type="email" v-model="emailInEdit" placeholder="Email">
                    <input type="text" v-model="positionInEdit" placeholder="Position">
                    <label>
                        <input type="checkbox" v-model="masterInEdit"> Master
                    </label>
                </div>
                <button type="submit">Update</button>
            </form>
        </dialog>
    </div>
</template>

<style lang="scss">
.close-button {
    margin-left: auto;
}

.dialog-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

dialog {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px;
    background: white;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-left: auto;
    margin-right: auto;
}

.edit-input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    label {
        cursor: pointer;
    }
}

</style>