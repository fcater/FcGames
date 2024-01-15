<template>
  <el-dialog
    @close="closeModal"
    v-model="dialogVisible"
    title="钱包"
    width="30%"
  >
    <div v-if="!success">
      <img
        class="game-poster"
        :src="getGamePoster(gameCart.singleGame?.poster)"
      />
      <p>购买 {{ gameCart.singleGame?.title }}</p>
      <span>价格: {{ price }}</span>
      <p>用户余额: {{ currentUser.accountBalance }}</p>
      <p>结余: {{ accountBalance }}</p>
    </div>
    <div v-else>
      <el-icon class="success-icon" size="5rem"><ShoppingBag /></el-icon>
      <p>谢谢</p>
    </div>

    <div class="error">{{ error }}</div>
    <template #footer v-if="!success">
      <span class="dialog-footer">
        <el-button @click="closeModal">取消</el-button>
        <el-button
          class="buy-game-modal-confirm"
          type="primary"
          @click="handleBuyGame"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { useGameCart } from "../../store/gameCart";
import { useCurrentUser } from "../../store/currentUser";
import { getGamePoster } from "../../utilities";
import { MESSAGE_TIME, DIALOG_FADE_OUT_TIME } from "../../constants/delay";
import httpService from "../../services/httpService";
import toast from "../../constants/toast";

const currentUser = useCurrentUser();
const gameCart = useGameCart();
const dialogVisible = ref(false);
const success = ref(false);
const error = ref("");

const price = computed(() => {
  const _price = gameCart.singleGame?.discountedPrice;
  return _price === 0 ? "免费!" : _price;
});
const accountBalance = computed(
  () => currentUser.accountBalance - (gameCart.singleGame?.discountedPrice || 0)
);

watchEffect(() => (dialogVisible.value = gameCart.singleGame !== null));

const closeModal = () => {
  dialogVisible.value = false;
  setTimeout(() => gameCart.setSingleGame(null), DIALOG_FADE_OUT_TIME);
};

const buyGameSuccess = () => {
  currentUser.fetchUser();
  success.value = true;
  toast.success("购买成功！");
  setTimeout(() => closeModal(), MESSAGE_TIME);
  gameCart.removeFromCart(gameCart.singleGame);
};

const handleBuyGame = () => {
  const url = `api/userGames/${currentUser.id}?gameIds=${gameCart.singleGame?.id}`;
  httpService
    .post(url)
    .then(buyGameSuccess)
    .catch((err) => (error.value = err));
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.game-poster {
  width: 8rem;
}
.error {
  color: red;
}
.success-icon {
  padding: 1rem;
  color: #fff;
  background: #12c2e9;
  background: -webkit-linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  border-radius: 1rem;
}
</style>
