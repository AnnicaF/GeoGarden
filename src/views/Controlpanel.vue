<script setup>
import AdminNavigation from '@/components/AdminNavigation.vue';
import AdminRow from '@/components/AdminRow.vue';
import CreateNewAdmin from '@/components/CreateNewAdmin.vue';
import EditAdminModal from '@/components/EditAdminModal.vue'
import { useRouter } from 'vue-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { ref, onMounted, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { admin } from '../stores/store.js'

const adminList = ref([]);
const auth = getAuth();
const loadingAdmins = ref(true);
const error = ref(null);

const router = useRouter();

const redirectToLogin = () => {
    router.push('/admin');
};

const invertAdminValue = () => {
    admin.invertValue();
    console.log(admin);
};

const fetchCollection = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'adminUsers'));
        const data = [];
        
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        adminList.value = data;
    } catch (err) {
        console.error('Error fetching collection:', err);
        error.value = 'Failed to load admin users. Please try again later.';
    } finally {
        loadingAdmins.value = false;
    }
};

const checkIfMaster = async (uidToFind) => {
  try {
    const q = query(collection(db, "adminUsers"), where("uid", "==", uidToFind));
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        if (doc.data().master) {
            console.log('is master');
        } else {
            console.log('is not master');
            invertAdminValue()
        }
      });
    } else {
      console.log("No documents found with uid:", uidToFind);
    }

  } catch (error) {
    console.error("Error searching for document:", error);
  }
};

onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.uid);
            checkIfMaster(user.uid);
            fetchCollection();
        } else {
            console.log('User is not authenticated');
            redirectToLogin();
        }
    });

    onUnmounted(() => {
        unsubscribe();
    });
});
</script>

<template>
    <div>
        <EditAdminModal />
        <AdminNavigation />
        <CreateNewAdmin />

        <div v-if="loadingAdmins">
            Loading admin users...
        </div>

        <div v-else>
            <div v-if="error">
                <p>{{ error }}</p>
            </div>

            <div v-else>
                <AdminRow
                    v-for="admin in adminList"
                    :key="admin.id"
                    :name="admin.name"
                    :email="admin.email"
                    :position="admin.position"
                    :master="admin.master"
                    :id="admin.id"
                    :editId="admin.uid"
                />
            </div>
        </div>
    </div>
</template>
