<template>
  <div class="container container-fluid border mt-3">
    <form @submit="editEmployee">
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Nome</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            name="nome"
            v-model="employee.name"
            required
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Cargo</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            name="cargo"
            v-model="employee.office"
            required
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Data de Nascimento</label>
        <div class="col-sm-10">
          <input
            type="date"
            class="form-control"
            name="dataNasc"
            v-model="employee.birth_date"
            required
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Data de Entrada na Empresa</label>
        <div class="col-sm-10">
          <input
            type="date"
            class="form-control"
            name="dataEntrada"
            v-model="employee.initial_date"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Editar</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api.js";
export default {
  
  name: "Edit",
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
  methods: {
    editEmployee() {
      api.put('/employee/' + this.$route.params.id, this.employee).then((Response) => {
        console.log(Response);
      })
      this.$router.push({
        path: '/'
      })
    },
  },
};
</script>