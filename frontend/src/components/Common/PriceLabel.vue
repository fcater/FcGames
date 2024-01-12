<template>
  <span class="discount" v-if="showDiscount">{{ `- ${discount}%` }}</span>
  <span
    class="price"
    v-if="showDiscount"
    :style="{ textDecoration: showDiscount ? 'line-through' : 'none' }"
    >{{ game.price + "￥" }}</span
  >
  <span v-if="isFree">免费！</span>
  <span v-else>{{ game.discountedPrice + "￥" }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getGameDiscount } from "../../utilities";

const props = defineProps(["game"]);
const discount = computed(() => getGameDiscount(props.game.discount));
const showDiscount = computed(() => discount.value !== 0);
const isFree = computed(() => props.game.discountedPrice === 0);
</script>

<style scoped>
.discount {
  padding: 4px 8px;
  border-radius: 2px;
  background-color: green;
  font-size: 12px;
  color: #fff;
  margin-right: 0.5rem;
  text-wrap: nowrap;
}
.price {
  margin-right: 0.5rem;
}
</style>
