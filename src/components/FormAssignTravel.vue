<template>
  <div class="flex flex-col p-6">
    <el-form :model="ruleForm" :rules="rules" :ref="nameRef">
      <div class="w-full flex flex-col lg:flex-row">
        <el-form-item prop="userId" class="w-full">
          <el-select
            v-model="ruleForm.userId"
            filterable
            placeholder="Usuario"
            style="width: 100%"
          >
            <el-option
              v-for="item in usersOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>

      <div class="text-center mx-auto">
        <button
          type="button"
          @click="assignDevice(ruleForm)"
          class="text-white bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Guardar
        </button>
      </div>
    </el-form>
    <el-alert
      v-if="isSucces"
      title="success alert"
      type="success"
      center
      show-icon
    />
  </div>
</template>
<style>
.label-left .el-form-item__label {
  text-align: left;
}
</style>
<script>
import auth from "@/logic/auth";
import { defineComponent } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import user from "../logic/user";
import device from "@/logic/devices";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  props: {
    nameRef: {
      default: "",
    },
    device: {
      default: null,
    },
  },
  data() {
    return {
      isSucces: false,
      companyId: null,

      usersOptions: [],
      rules: {
        userId: [
          {
            required: true,
            message: "Elige un usuario",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {
        userId: "",
      },
    };
  },

  mounted() {
    var user = auth.getUserLogged();
    if (user != null) {
      this.companyId = user["id"];
    }
    if (this.companyId != null) {
      this.getUSers();
    }
    if (this.company) {
      this.ruleForm.userId = this.device.userId;
    }
  },
  methods: {
    assignDevice() {
      this.$refs[this.nameRef].validate((valid) => {
        if (valid) {
          var data = {
            deviceId: this.device._id,
            userId: this.ruleForm.userId,
          };

          console.log(data);
          device.assignDevice(data);
          // this.$emit('save', this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getUSers() {
      user
        .getUsers(this.companyId)
        .then((result) => {
          this.usersOptions = result.data.data.map(function (user) {
            return {
              label: user.firstName,
              value: user._id,
            };
          });
        })
        .catch((err) => {});
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
