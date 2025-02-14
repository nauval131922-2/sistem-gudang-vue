<template lang="">
    <NavBar :name="userName" :role="roleId" />
  
    <div class="container">
      <h2 class="my-5">Loan List</h2>
  
      <RouterLink to="/loan/create" class="btn btn-primary mb-3 form-control"
        >Add Loan</RouterLink
      >
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Borrower</th>
            <th scope="col">Borrowed Date</th>
            <th scope="col">Returned Date</th>
            <th scope="col">Status</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>nauval</td>
            <td>14-10-2021</td>
            <td>20-10-2021</td>
            <td>returned</td>
            <td>
              <img
                v-if="item.image"
                :src="url + item.image"
                alt="item image"
                style="width: 50px; height: 50px"
                class="object-fit-cover rounded"
              />
              <img
                v-else
                src="@/assets/images/no-img.jpg"
                alt="item image"
                style="width: 50px; height: 50px"
                class="object-fit-cover rounded"
              />
            </td>
            <td>
              <RouterLink
                :to="{ name: 'itemEdit', params: { itemId: item.id } }"
              >
                Edit
              </RouterLink>
              |
              <a
                href="#"
                @click="deleteItem(item.id)"
                class="text-danger"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import NavBar from "@/components/NavBar.vue";
  import axios from "axios";
  import router from "@/router";
  
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
  
          this.getItems();
      },
      methods: {
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
                      if (error.response.status == 401) {
                          localStorage.removeItem("token");
                          localStorage.removeItem("name");
                          localStorage.removeItem("role_id");
  
                          router.push({ name: "login" });
                      }
                      console.log(error);
                  });
          },
          deleteItem(id) {
              if (confirm("Are you sure you want to delete this item?")) {
                  axios
                      .delete(`http://127.0.0.1:8000/api/item/${id}`, {
                          headers: {
                              Authorization: "Bearer " + localStorage.getItem("token"),
                          },
                      })
                      .then((response) => {
                          alert("Item deleted successfully!"); // Tampilkan pesan sukses
                          this.getItems(); // Refresh daftar item
                      })
                      .catch((error) => {
                          console.error("Error deleting item:", error);
                          alert("Failed to delete item. Please try again.");
                      });
              }
          }
  
      },
  };
  </script>
  <style lang="">
  </style>
  