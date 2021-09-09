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
      <button
        type="button"
        class="btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target="#filtrarQtd"
      >
        Filtro por quantidade
      </button>
    </div>
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
            <a :href="'/employee/' + employee.id">
              <button class="btn btn-success btn-sm">VER</button>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Create employee-->
    <div
      class="modal fade"
      id="createFunc"
      tabindex="-1"
      aria-labelledby="createEmployee"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Funcionário</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit="addEmployee">
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
                    name="Cargo"
                    v-model="employee.office"
                    required
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Data Nascimento</label>
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
              <button type="submit" class="btn btn-primary">Criar</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="filtrarCargo"
      tabindex="-1"
      aria-labelledby="filtrarCargo"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="filtrarCargo">Filtrar por cargo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Cargo</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  name="nome"
                  v-model="office"
                  required
                />
              </div>
            </div>
            <a :href="'/office/' + office">
              <button class="btn btn-primary">Filtrar</button>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="filtrarQtd"
      tabindex="-1"
      aria-labelledby="filtrarQtd"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="filtrarQtd">Filtrar por qtd</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Qtd</label>
              <div class="col-sm-10">
                <input
                  type="number"
                  min="0"
                  class="form-control"
                  name="nome"
                  v-model="qtd"
                  required
                />
              </div>
            </div>
            <a :href="'/qtd/' + qtd">
              <button class="btn btn-primary">Filtrar</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api.js";

export default {
  name: "Employers",
  data() {
    return {
      employers: [],
      employee: {
        name: "",
        office: "",
        bith_date: "",
        intial_date: ""
      },
      office: "",
      qtd: 0,
    };
  },
  mounted() {
    api.get('employee').then((Response) => {
      this.employers = Response.data;
      console.log(Response.data)
    });
  },
  methods: {
    addEmployee() {
      api.post("/employee", this.employee).then((Response) => {
        console.log(Response);
        this.$router.go();
      });
    },
    delEmployee(id) {
      api.delete("/employee/" + id).then((Response) => {
        this.$router.go();
        console.log(Response);
      });
    },
  },
};
</script>
