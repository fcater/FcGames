<template>
  <el-card
    class="add-game-card"
    @click="emit('onManageGame', {})"
    :style="cardStyle"
  >
    <el-icon
      :color="states.viewChart ? '' : '#999'"
      :size="states.viewChart ? '8rem' : '1.25rem'"
    >
      <CirclePlus />
    </el-icon>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameListStates } from "../../../../store/gameListStates";

const emit = defineEmits(["onManageGame"]);
const states = useGameListStates();

const cardStyle = computed(() => {
  let height, width;
  width = states.viewChart ? "25rem" : "100%";
  if (!states.manageMode) height = width = 0;
  return {
    height: height,
    width: width,
    border: !states.viewChart && states.manageMode ? "1px solid #999" : "none",
  };
});
</script>

<style scoped>
.add-game-card {
  margin: auto 0;
  display: inline-block;
  cursor: pointer;
  box-shadow: none !important;
  border: none;
  width: 25rem;
  background-color: transparent;
}
</style>
