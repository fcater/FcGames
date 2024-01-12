<template>
  <el-dialog
    @close="closeDialog"
    v-model="showDialog"
    title="警告！正在删除用户"
    width="30rem"
    align-center
  >
    <h2 class="currentUser">{{ currentUserTitle }}</h2>
    <span
      >删除一个用户会移除这个用户的所有信息和游戏，并且这个过程是不可逆的！</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          class="user-dialog-delete"
          type="danger"
          @click="handleDeleteUser"
        >
          删除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

import toast from "../../constants/toast";
import httpService from "../../services/httpService";
import { DIALOG_FADE_OUT_TIME } from "../../constants/delay";

const emit = defineEmits();
const showDialog = ref(false);
const props = defineProps(["deleteUser"]);

watchEffect(() => (showDialog.value = props.deleteUser !== null));

const currentUserTitle = computed(() => {
  return `(ID: ${props.deleteUser?.id}) ${props.deleteUser?.username}`;
});

const closeDialog = () => {
  showDialog.value = false;
  setTimeout(() => emit("onDeleteUser", null), DIALOG_FADE_OUT_TIME);
};

const handleDeleteUser = async () => {
  try {
    await httpService.delete(`api/user/${props.deleteUser.id}`);
    toast.success("删除成功");
    emit("onFetchUsers");
  } catch (error: any) {
    toast.failed("删除失败", error);
  } finally {
    closeDialog();
  }
};
</script>
<style scoped>
.currentUser {
  margin-top: 0;
  color: red;
}
</style>
