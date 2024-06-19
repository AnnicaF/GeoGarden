<script setup>
import AdminNavigation from '@/components/AdminNavigation.vue';
import AdminRow from '@/components/AdminRow.vue'
import CreateNewAdmin from '@/components/CreateNewAdmin.vue'
import { useRouter } from 'vue-router';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const adminList = ref([]);
const auth = getAuth();
const loadingAdmins = ref(true)

const router = useRouter();

const redirectToLogin = () => {
    router.push('/admin');
}

const fetchCollection = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'adminUsers'));
        const data = [];
        
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push({ id: doc.id, ...doc.data() });
        });

        adminList.value = data;
        loadingAdmins.value = false
    } catch (error) {
        console.error('Error fetching collection:', error);
    }
};

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is authenticated
            fetchCollection();
        } else {
            console.log('User is not authenticated');
            redirectToLogin()
        }
    });
});

</script>

<template>
    <AdminNavigation />
    <CreateNewAdmin />

    <div v-if="loadingAdmins">
        <p>Loading</p>
    </div>

    <ul v-else>
        <AdminRow 
            v-for="admin in adminList" 
            :key="admin.id"
            :name="admin.name"
            :email="admin.email"
            :position="admin.position"
            :master="admin.master"
            :id="admin.id"
        />
    </ul>
</template>
