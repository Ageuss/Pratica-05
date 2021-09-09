<template>
  <div class="container container-fluid border">
    <div class="container container-fluid border mt-4 mb-4 text-center">
      <h1>Listagem de Funcionários</h1>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Cargo</th>
          <th scope="col">Data de Nascimento</th>
          <th scope="col">Data de entrada na Empresa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employers" :key="index">
          <th>{{ employee.name }}</th>
          <td>{{ employee.office }}</td>
          <td>{{ employee.birth_date }}</td>
          <td>{{ employee.initial_date }}</td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              v-on:click="delEmployee(employee.id)"
            >
              DEL
            </button>
            <a :href="'/edit/' + employee.id">
              <button class="btn btn-primary btn-sm">EDIT</button>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/api.js";
export default {
  name: "Qtd",
  data() {
    return {
      employers: [],
      employee: {
        name: "",
        office: "",
        birth_date: "",
        initial_date: "",
      },
    };
  },
  mounted() {
    api.get("/employee/qtd/" + this.$route.params.qtd).then((Response) => {
      if (Response.data != null && this.$route.params.qtd > 0) {
        this.employers = Response.data;
      } else {
        this.employers = [];
      }
    });
  },
  delEmployee(id) {
    api.delete("/employee/" + id).then((Response) => {
      console.log(Response);
      this.$router.go();
    });
  },
};
</script>