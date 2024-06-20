import { reactive } from 'vue';

export const admin = reactive({
  value: true,
  invertValue() {
    this.value = !this.value;
  }
});

export const modal = reactive({
    modalValue: false,
    id: '',
    name: '',
    email: '',
    position: '',
    master: null,
  
    openModal(adminId, adminName, adminEmail, adminPosition, adminMaster) {
      this.modalValue = true;
      this.id = adminId;
      this.name = adminName;
      this.email = adminEmail;
      this.position = adminPosition;
      this.master = adminMaster;
    }
  });

  