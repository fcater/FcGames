<template>
  <div class="table-container">
    <el-table
      :data="users"
      row-class-name="user-table-row"
      header-row-class-name="user-table-header-row"
    >
      <el-table-column label="id" prop="id" />
      <el-table-column label="用户名">
        <template #default="{ row }">
          <div>{{ row.username + (row.isAdmin ? "(管理员)" : "") }}</div>
        </template>
      </el-table-column>
      <el-table-column label="余额" prop="accountBalance" />
      <el-table-column label="管理">
        <template #default="{ row: user }">
          <el-button
            class="user-table-recharge"
            link
            type="primary"
            size="small"
            @click="$emit('onRechargeUser', user)"
            >充值</el-button
          >
          <el-button
            v-if="!user.isAdmin"
            class="user-table-delete"
            link
            type="danger"
            size="small"
            @click="$emit('onDeleteUser', user)"
            ><el-icon> <Delete /> </el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineProps(["users"]);
</script>

<style scoped>
.table-container {
  width: 70%;
  margin: 3rem auto;
  background-color: #202020;
}
:deep(.user-table-row),
:deep(.user-table-header-row > th) {
  background-color: #202020 !important;
  color: white;
}

:deep(.user-table-row):hover,
:deep(.user-table-header-row > th):hover {
  background-color: #fff !important;
  color: black;
}
</style>
