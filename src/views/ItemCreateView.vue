<template lang="">
  <NavBar :name="userName" :role="roleId" />

  <div class="container">
    <h2 class="my-5">Add Item</h2>

    <form @submit.prevent="createItem" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">Stock</label>
        <input type="number" class="form-control" id="stock" v-model="stock" />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          type="file"
          class="form-control"
          id="image"
          @change="onFileChange($event)"
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
      items: [],
      url: "http://127.0.0.1:8000/storage/items/",
      name: "",
      stock: "",
      file: "",
    };
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
  },
  methods: {
    createItem() {
      if (!this.name || !this.stock) {
        alert("Please fill all fields");
        return;
      }

      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("stock", this.stock);
      formData.append("image_file", this.file);

      axios
        .post("http://127.0.0.1:8000/api/item", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.$router.push({ name: "item" });
        })
        .catch(function (error) {
          console.log("Error response:", error.response.data);
          alert(error.response.data.message || "An error occurred");
        });
    },
    onFileChange(e) {
      let file = e.target.files[0];
      this.file = file;
    },
  },
};
</script>
<style lang=""></style>
