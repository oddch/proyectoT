<template>
  <div class="w-full py-16 px-10">
    <div class="text-4xl text-center text-primary-100">Lista de Compañias</div>
    <div class="text-center mx-auto pt-8 pb-24">
      <button type="button" @click="goToCreateCompany"
        class="text-white bg-gradient-to-r from-tertiary-100 via-tertiary-200 to-tertiary-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Crear Compañia
      </button>
    </div>
    <loading v-model:active="isLoading"
                 :can-cancel="true"
                 
                 :is-full-page="false"/>
    <div class="flex h-auto justify-center flex-wrap">
      <div v-for="company in companiesList" :key="company._id" class="mr-5">
        <div class="relative w-[320px] rounded-xl shadow-lg  bg-white mb-10 sm:mb-10 md:mb-10">
          <strong
            class="z-10 absolute top-4 -left-2 w-fit px-4 py-1 bg-primary-100 rounded-r-md text-white text-center text-base font-thin">
            {{ company.tipoCompania }}
          </strong>
          <button @click="openEditCompanyModal(company)" class="z-10 absolute top-4 right-5 w-fit" style="background: none; 
              border: none; 
              cursor: pointer;">
              <el-icon :size="20" color="#ffffff">
                <Edit />
              </el-icon>
          </button>
          <img src="https://img.freepik.com/fotos-premium/camion-gris-carretera-noche_266732-26311.jpg?w=1380" alt=""
            class="w-full h-32 object-center object-cover rounded-t-2xl">
          <div class="overflow-hidden">
            <div class="p-4">
              <p class="mb-1 text-base text-primary-200 font-semibold">
                Información básica:
              </p>
              <div>
                <p class="mb-1 text-base text-gray-500">
                  {{ company.firstName }}
                  {{ company.lastName }}
                </p>
                <p class="mb-1 text-base text-gray-500">
                  {{ company.user }}
                </p>
                <p class="mb-1 text-base text-gray-500">
                  {{ company.email }}
                </p>
              </div>
              <!-- <hr class="my-2 -mx-4">
              <p class="-mx-4 px-4 text-base text-white bg-blue-300 font-semibold">
                {{ company.tipoCompania }}
              </p> -->
              <hr class="my-2 -mx-4">
              <div class="flex items-center justify-between w-64 pt-1">
                <div class="w-1/2 text-tertiary-100 text-sm">
                  <p class="font-semibold mb-2">
                    Habilitado:
                  </p>
                  <p class="font-semibold mb-2">
                    Máx de usuarios:
                  </p>
                  <p class="font-semibold mb-2">
                    Riesgo:
                  </p>
                  <p class="font-semibold mb-2">
                    tipo de viajes:
                  </p>
                </div>
                <div class="w-1/2 ml-4 text-gray-400 text-sm">
                  <p class="mb-2">
                    {{ company.enabled ? 'Si' : 'No' }}
                  </p>
                  <p class="mb-2">
                    {{ company.maxUsers ? company.maxUsers : '-' }}
                  </p>
                  <p class="mb-2">
                    {{ company.riesgo ? company.riesgo : '-' }}
                  </p>
                  <p class="mb-2">
                    {{ company.tipos_viajes ? company.tipos_viajes : '-' }}
                  </p>
                </div>
              </div>
              <hr class="my-2">
              <div class="mb-4 text-sm text-gray-400">
                <p class="italy font-semibold">Fecha de expiración</p>
                <p class="truncate">{{ company.expiration_date ? company.expiration_date : '--' }}</p>
              </div>
              <!-- <div class="flex justify-center pt-2">
                <button type="button" @click="goToUserList(company._id)"
                  class="text-white bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  Ver usuarios
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="companyToEdit">
        <el-dialog v-model="editCompany" :before-close="closeEditCompanyModal">
            <Form class="mx-auto w-full" @updateData="updateData" :company="companyToEdit" nameRef="edit-company" :regions="regions"/>
        </el-dialog>
    </div>

  </div>
</template>
<script>
import companies from "@/logic/companies";
import Form from '../../components/CompanyForm.vue';
import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';

export default {
  components: {
        Form,
        Loading
  },
  data: () => ({
    companiesList: [],
    editCompany: false,
    companyToEdit: null,
    isLoading: false,
    regions: []
  }),
  mounted() {
    this.getCompanies()
    this.getRegions()
  },

  methods: {
    getCompanies() {
      companies.getCompanies().then((result) => {
        this.isLoading = true
        console.log(result.data.data[0])
        this.companiesList = result.data.data
        
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      });
    },
    goToCreateCompany() {
      this.$router.push("/companies/create")
    },
    goToUserList(id) {
      this.$router.push({ name: 'User-list', params: { companyId: id } })
    },
    openEditCompanyModal(company) {
      console.log('company---------------------');
      console.log(company);
      this.editCompany = true
      this.companyToEdit = company
    },
    closeEditCompanyModal() {
      this.editCompany = false
      this.companyToEdit = null
    },
    getRegions() {
            companies.getRegions().then((result) => {
                if (result.data.data != null) {
                    this.regions = result.data.data.map(function (region) {
                        return { label: region.nombre_municipio, value: region._id };
                    });

                }

            }).catch((err) => {

            });
    },
    updateData(newdata) {
      console.log('newdata')
      console.log(newdata)
      const index = this.companiesList.findIndex(
        (company) => company._id === newdata.userId
        );
        
        if (index !== -1) {
          console.log('entra')
          this.companiesList.splice(index, 1, newdata);
        }
      this.closeEditCompanyModal()
    }
  },
  computed: {
    proxiedArray() {
      return new Proxy(this.companiesList, {
        // Implementa las trampas necesarias según tus necesidades
      });
    },
  },
}
</script>