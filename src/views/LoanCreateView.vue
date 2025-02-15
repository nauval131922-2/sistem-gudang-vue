<template lang="">
  <NavBar :name="userName" :role="roleId" />

  <div class="container">
    <h2 class="my-5">Add Loan</h2>

    <form @submit.prevent="createLoan" enctype="multipart/form-data">
      <!-- Select Item -->
      <div class="mb-3">
        <label for="item" class="form-label">Item</label>
        <select class="form-select" id="item" v-model="selectedItem">
          <option value="" disabled>Choose...</option>
          <option v-for="item in items" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>

      <!-- Show Item Image -->
      <div v-if="selectedItemData">
        <div class="mb-3">
          <label for="image" class="form-label">Image</label><br />
          <img :src="url + selectedItemData.image" alt="" width="200px" />
        </div>
      </div>
      <div class="mb-3">
        <label for="borrower" class="form-label">Borrower</label>
        <input
          type="text"
          class="form-control"
          id="borrower"
          v-model="borrower"
        />
      </div>
      <!-- loan date -->
      <div class="mb-3">
        <label for="loan_date" class="form-label">Loan Date</label>
        <input
          type="date"
          class="form-control"
          id="loan_date"
          v-model="loan_date"
        />
      </div>
      <button type="submit" class="btn btn-primary form-control">Submit</button>
    </form>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userName: "",
      roleId: "",
      url: "http://127.0.0.1:8000/storage/items/",
      selectedItem: "",
      items: [],
      borrower: "",
      // loan date default hari ini
      loan_date: new Date().toISOString().split("T")[0],
      file: "",
    };
  },
  computed: {
    // Mencari item yang sesuai dengan ID yang dipilih
    selectedItemData() {
      return this.items.find((item) => item.id == this.selectedItem) || null;
    },
  },
  mounted() {
    this.userName = localStorage.getItem("name");
    this.roleId = localStorage.getItem("role_id");

    if (!this.userName) {
      this.$router.push({ name: "login" });
    }

    if (this.roleId != 1) {
      this.$router.push({ name: "home" });
    }

    this.getItems();
  },
  methods: {
    createLoan() {
      if (!this.selectedItem || !this.borrower || !this.loan_date) {
        alert("Please fill all fields");
        return;
      }

      let formData = new FormData();
      formData.append("item_id", this.selectedItem);
      formData.append("borrower_name", this.borrower);
      formData.append("loan_date", this.loan_date);

      axios
        .post("http://127.0.0.1:8000/api/loan", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.$router.push({ name: "loan" });
        })
        .catch(function (error) {
          console.log("Error response:", error.response.data);
          alert(error.response.data.message || "An error occurred");
        });
    },
    getItems() {
      axios
        .get("http://127.0.0.1:8000/api/item", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.items = response.data.data;
        })
        .catch(function (error) {
          console.log("Error response:", error.response.data);
          alert(error.response.data.message || "An error occurred");
        });
    },
  },
};
</script>
<style lang=""></style>
