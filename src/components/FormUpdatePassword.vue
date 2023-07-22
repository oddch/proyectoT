<template>
    <div class="flex flex-col p-6 flex flex-col p-6 bg-white w-2/3 shadow-xl rounded-2xl">
        <p class="mb-6 text-lg text-tertiary-300 font-semibold bg-tertiary-25 -m-5 px-6 py-3 rounded-t-xl">
           Cambiar Contraseña
        </p>
        <el-form :model="ruleForm" :rules="rules" :ref="nameRef">
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item prop="currentPassword" class="w-full lg:w-1/2 lg:mr-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Contraseña actual
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.currentPassword" placeholder="Digita contraseña actual" />
                </el-form-item>
                <el-form-item prop="newPassword" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Contraseña nueva
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.newPassword" type="password" placeholder="Digita contraseña nueva" />
                </el-form-item>
            </div>

            <div class="text-center mx-auto">
                <button type="button" @click=" updatePassword(ruleForm)"
                class="text-white bg-tertiary-200 hover:bg-tertiary-100 focus:ring-2 focus:outline-none focus:ring-tertiary-300 dark:focus:ring-tertiary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Actualizar
                </button>
            </div>
        </el-form>
        <el-alert v-if="isSucces" title="success alert" type="success" center show-icon />
    </div>
</template>
<style>

</style> 
<script>
import { defineComponent } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import user from "../logic/user";

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
        companyId: {
            default: null
        },
        user: {
            default: null
        }
    },
    data() {
        return {
            isSucces: false,
            ruleForm: {

                currentPassword: '',
                newPassword: '',

            },

            rules: {
                currentPassword: [
                    {
                        required: true,
                        message: 'Por favor ingresa una contraseña',
                        trigger: 'blur',
                    },

                ],
                newPassword: [
                    {
                        required: true,
                        message: 'Por favor ingresa una contraseña',
                        trigger: 'blur',
                    },

                ],

            },
        };
    },
    mounted() {
        
    },
    methods: {
        updatePassword() {
            this.$refs[this.nameRef].validate((valid) => {
                if (valid) {
                    var data = {
                        userId: this.user._id,
                        currentPassword: this.ruleForm.currentPassword,
                        newPassword: this.ruleForm.newPassword,
                    };

                    console.log(data);
                    user.updatePassword(data)
                    // this.isSucces = true
                    // this.$emit('save', this.ruleForm);
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
  