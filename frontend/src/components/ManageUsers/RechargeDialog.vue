<template>
  <el-dialog
    @close="closeDialog"
    v-model="showDialog"
    title="充值"
    width="30%"
    align-center
  >
    <h2 class="currentUser">{{ currentUserTitle }}</h2>
    <el-form :model="form">
      <el-form-item label="金额（￥）">
        <el-input
          class="recharge-amount"
          type="number"
          v-model="form.amount"
          autocomplete="off"
          placeholder="请输入金额"
        />
      </el-form-item>
    </el-form>
    <span align-left>充值后金额：{{ estimatedAmount }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          class="user-dialog-recharge"
          type="primary"
          @click="handleRechageUser"
        >
          充值
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import { ElNotification } from "element-plus";

import httpService from "../../services/httpService";
import { DIALOG_FADE_OUT_TIME } from "../../constants/delay";

const emit = defineEmits();
const showDialog = ref(false);
const form = reactive({ amount: 0 });
const props = defineProps(["rechargeUser"]);

watchEffect(() => (showDialog.value = props.rechargeUser !== null));

const currentUserTitle = computed(() => {
  return `${props.rechargeUser?.username}: ￥${props.rechargeUser?.accountBalance} `;
});
const estimatedAmount = computed(() => {
  const amount = props.rechargeUser?.accountBalance + Number(form.amount);
  return amount > 0 ? amount : 0;
});

const closeDialog = () => {
  showDialog.value = false;
  form.amount = 0;
  setTimeout(() => emit("onRechargeUser", null), DIALOG_FADE_OUT_TIME);
};

const handleRechageUser = async () => {
  const body = { accountBalance: estimatedAmount.value };
  try {
    await httpService.patch(`api/user/${props.rechargeUser.id}`, body);
    ElNotification({
      title: "充值成功！",
      type: "success",
      position: "top-left",
    });
    emit("onFetchUsers");
  } catch (error: any) {
    ElNotification({
      title: "充值失败: " + error?.response?.data?.message || "",
      type: "warning",
      position: "top-left",
    });
  } finally {
    closeDialog();
  }
};
</script>

<style scoped>
.currentUser {
  margin-top: 0;
}
</style>
