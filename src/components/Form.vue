<template>
    <div class="flex flex-col bg-white border rounded-lg shadow-lg p-6">
      <el-form :model="ruleForm" :rules="rules" :ref="nameRef" label-width="120px">
        <div class="w-full flex flex-col lg:flex-row">
          <el-form-item label="Nombre" prop="firstName" class="w-full lg:w-1/2 mr-2">
            <el-input v-model="ruleForm.firstName" placeholder="Nombre" />
          </el-form-item>
          <el-form-item label="Apellido" prop="lastName" class="w-full lg:w-1/2 ml-2">
            <el-input v-model="ruleForm.lastName" placeholder="Apellido" />
          </el-form-item>
        </div>
        <div class="w-full flex flex-col lg:flex-row">
          <el-form-item label="phone" prop="phone" class="w-full lg:w-1/2 mr-2">
            <el-input v-model="ruleForm.phone" placeholder="Teléfono" />
          </el-form-item>
          <el-form-item label="identification" prop="identification" class="w-full lg:w-1/2 ml-2">
            <el-input v-model="ruleForm.identification" placeholder="Cédula" />
          </el-form-item>
        </div>
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email" placeholder="Correo electronico" />
        </el-form-item>
  
        <div class="text-center mx-auto">
          <el-form-item>
            <el-button @click="submitForm(ruleForm)" type="primary" class="btn-primary">Guardar</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  
  export default defineComponent({
    components: {
      ElForm,
      ElFormItem,
      ElInput,
      ElButton,
    },
    props: {
      nameRef: {
        default: '',
      },
    },
    data() {
      return {
        ruleForm: {
          firstName: '',
          lastName: '',
          email: '',
          phone: 0,
          identification: '',
        },
        rules: {
          firstName: [
            {
              required: true,
              message: 'Por favor ingresa tu nombre',
              trigger: 'blur',
            },
            {
              min: 1,
              message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
              trigger: 'blur',
            },
          ],
          lastName: [
            {
              required: true,
              message: 'Por favor ingresa tu Apellido',
              trigger: 'blur',
            },
            {
              min: 1,
              message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
              trigger: 'blur',
            },
          ],
          email: [
            {
              required: true,
              message: 'Por favor ingresa tu email',
              trigger: 'blur',
            },
            {
              min: 1,
              message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
              trigger: 'blur',
            },
          ],
          phone: [
            {
              required: true,
              message: 'Por favor ingresa un número de telefono',
              trigger: 'blur',
            },
            {
              message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
              trigger: 'blur',
            },
          ],
          identification: [
            {
              required: true,
              message: 'Por favor ingresa el número de identificación',
              trigger: 'blur',
            },
            {
              message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    created() {
      const savedCustomer = localStorage.getItem(this.nameRef);
      if (savedCustomer) {
        this.ruleForm = JSON.parse(savedCustomer);
      }
    },
    watch: {
      ruleForm: {
        handler() {
          localStorage.setItem(this.nameRef, JSON.stringify(this.ruleForm));
        },
        deep: true,
      },
    },
    methods: {
      saveCustomer() {
        console.log('Información del cliente guardada:', this.ruleForm);
      },
      submitForm() {
        this.$refs[this.nameRef].validate((valid) => {
          if (valid) {
            this.saveCustomer();
            this.$emit('save', this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  });
  </script>
  
  <style>
  .btn-primary {
    background-color: rgb(1, 75, 109);
    color: rgb(165, 183, 190);
  }
  </style>
  