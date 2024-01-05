<template>
  <UsersTable
    :users="users"
    @onRechargeUser="onRechargeUser"
    @onDeleteUser="onDeleteUser"
  />
  <RechargeDialog
    :rechargeUser="rechargeUser"
    @onRechargeUser="onRechargeUser"
    @onFetchUsers="fetchUsers"
  />
  <DeleteDialog
    :deleteUser="deleteUser"
    @onDeleteUser="onDeleteUser"
    @onFetchUsers="fetchUsers"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { User } from "../types/User";
import httpService from "../services/httpService";
import DeleteDialog from "../components/ManageUsers/DeleteDialog.vue";
import RechargeDialog from "../components/ManageUsers/RechargeDialog.vue";
import UsersTable from "../components/ManageUsers/UsersTable.vue";

const users = ref<User[] | null>(null);
const deleteUser = ref<User | null>(null);
const rechargeUser = ref<User | null>(null);

const onDeleteUser = (user: User) => (deleteUser.value = user);
const onRechargeUser = (user: User) => (rechargeUser.value = user);

const fetchUsers = () => {
  httpService
    .get("api/user")
    .then(({ data }) => (users.value = data))
    .catch((error) => console.error("获取失败:", error));
};

onMounted(() => fetchUsers());
</script>
