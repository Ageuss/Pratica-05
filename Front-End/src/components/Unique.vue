<template>
  <div class="container container-fluid border mt-3">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Cargo</th>
          <th scope="col">Data de Nascimento</th>
          <th scope="col">Entrada na Empresa </th>
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
    api.get("/employee/" + this.$route.params.id).then((Response) => {
      console.log(Response.data)
      if(Response.data != false){
        this.employers = Response.data;
      } else{
        this.$router.push({
        path: '/'
      })
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