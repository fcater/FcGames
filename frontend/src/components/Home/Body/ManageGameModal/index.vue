<template>
  <div>
    <el-dialog
      destroy-on-close
      @close="closeDialog"
      v-model="showDialog"
      :title="isAddMode ? '添加游戏' : '编辑游戏'"
      width="30rem"
      align-center
    >
      <GameForm
        :game="game"
        :isAddMode="isAddMode"
        @closeDialog="closeDialog"
        @onFetchGames="emit('onFetchGames')"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

import { DIALOG_FADE_OUT_TIME } from "../../../../constants/delay";
import GameForm from "./GameForm.vue";

const emit = defineEmits(["onFetchGames", "onManageGame"]);
const props = defineProps(["game"]);
const showDialog = ref(false);

watchEffect(() => (showDialog.value = props.game !== null));

const isAddMode = computed(() => props.game?.title === undefined);

const closeDialog = () => {
  showDialog.value = false;
  setTimeout(() => emit("onManageGame", null), DIALOG_FADE_OUT_TIME);
};
</script>

<style scoped>
.form {
  padding: 2rem;
  padding-bottom: 0;
}
</style>
