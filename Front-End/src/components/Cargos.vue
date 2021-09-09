<template>
  <div class="container container-fluid border">
    <div class="container container-fluid border mt-4 mb-4 text-center">
      <h1>Listagem de Funcionários</h1>
    </div>
    <div class="container container-fluid mt-4 mb-4 text-center">
      <button
        type="button"
        class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#createFunc"
      >
        Add Funcionário
      </button>
      <button
        type="button"
        class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#filtrarCargo"
      >
        Filtro por cargo
      </button>
      <button type="button" class="btn btn-outline-success">
        Filtro por quantidade
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Cargo</th>
          <th scope="col">Data de Nascimento</th>
          <th scope="col">Data de Entrada na Empresa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employers" :key="index">
          <th>{{ employee.name }}</th>
          <td>{{ employee.office }}</td>
          <td>{{ employee.birth_date }}</td>
          <td>{{ employee.initial_date }}</td>
          <td>
            <button class="btn btn-danger btn-sm" v-on:click="delEmployee(employee.id)">
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
  
  name: "Office",
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
    api.get('/employee/office/' + this.$route.params.office).then((Response) => {
      this.employers = Response.data;
      console.log(Response.data)
    });
  },
  methods: {
    delEmployee(id) {
      api.delete("/employee/" + id).then((Response) => {
        console.log(Response);
        this.$router.go()
      });
    },
  }
};
</script>