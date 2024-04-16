<script setup>
import { reactive, ref } from "vue";
import { required, helpers } from "@vuelidate/validators";
import BaseInput from "./BaseInput.vue";
import useVuelidate from "@vuelidate/core";
import SignUpModal from "./SignUpModal.vue";

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  reEmail: "",
  zipCode: "",
  adult: "",
  children: "",
  agree: false,
});

const errorMessage = "Forkert indtastning";

const rules = {
  firstName: { required: helpers.withMessage(errorMessage, required) },
  lastName: { required: helpers.withMessage(errorMessage, required) },
  email: { required: helpers.withMessage(errorMessage, required) },
  reEmail: { required: helpers.withMessage(errorMessage, required) },
  agree: { required },
};

const v$ = useVuelidate(rules, formData);

const modalOpen = ref(false);

const updateShowModal = (value) => {
  modalOpen.value = value;
};

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result && formData.agree) {
    modalOpen.value = true;
  } else {
    v$.agree.$touch();
  }
};
</script>
<template>
  <form @submit.prevent="submitForm" class="form form--main">
    <div class="input-wrapper input-wrapper--main">
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.firstName"
          type="text"
          label="Fornavn"
          placeholder="Fornavn"
        />
        <span
          v-for="error in v$.firstName.$errors"
          :key="error.$uid"
          class="error-message error-message--main"
        >
          {{ error.$message }}
        </span>
      </div>
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.lastName"
          type="text"
          label="Efternavn"
          placeholder="Efternavn"
        />
        <span
          v-for="error in v$.lastName.$errors"
          :key="error.$uid"
          class="error-message error-message--main"
        >
          {{ error.$message }}
        </span>
      </div>
    </div>
    <div class="input-wrapper input-wrapper--main">
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.zipCode"
          type="number"
          label="Postnummer"
          placeholder="Postnummer"
          class="input input--main"
        />
      </div>
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.email"
          type="email"
          label="Mail"
          placeholder="Email"
          class="input input--main"
        />
        <span
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="error-message error-message--main"
        >
          {{ error.$message }}
        </span>
      </div>
    </div>
    <div class="input-wrapper input-wrapper--main">
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.reEmail"
          type="email"
          label="Gentag email"
          placeholder="Gentag email"
          class="input input--main"
        />
        <span
          v-for="error in v$.reEmail.$errors"
          :key="error.$uid"
          class="error-message error-message--main"
        >
          {{ error.$message }}
        </span>
      </div>
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.phone"
          type="number"
          label="Mobilnummer"
          placeholder="Mobilnummer"
          class="input input--main"
        />
      </div>
    </div>
    <div class="input-wrapper input-wrapper--main">
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.adult"
          type="text"
          label="Antal voksne i husstanden"
          placeholder="Antal i husstanden"
          class="input input--main"
        />
      </div>
      <div class="input-column input-column--main">
        <BaseInput
          v-model="formData.children"
          type="text"
          label="Antal børn i husstanden"
          placeholder="Antal børn i husstanden"
          class="input input--main"
        />
      </div>
    </div>

    <div class="checkbox-wrapper">
      <input type="checkbox" id="agreeCheckbox" v-model="formData.agree" />
      <label for="agreeCheckbox"
        >Er du indforstået med, at I indsamler og behandler mine data i
        overensstemmelse med jeres privatlivspolitik. Læs mere og vores cockie-
        og privatlivspolitik.
      </label>
      <span
        class="error-message error-message--main"
        v-if="!formData.agree && v$.agree.$dirty"
        >Du skal acceptere betingelserne og vilkårene.</span
      >
    </div>
    <div class="button-container">
      <button type="submit" class="button button--main">Tilmeld</button>
    </div>
  </form>
  <SignUpModal :show="modalOpen" @update:show="updateShowModal" />
</template>

<style lang="scss" scoped>
@import "../assets/style/SignUpForm.scss";
</style>