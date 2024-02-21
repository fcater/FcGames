<template>
  <header v-if="currentUser.username" class="header">
    <Logo class="header-logo" @click="gotoHome" />
    <span class="divider" />
    <span class="store" @click="gotoHome"> STORE </span>

    <el-dropdown class="shopping-dropdown">
      <div>
        <el-badge
          :hidden="emptyCart"
          :value="gameCart.cart.length"
          class="item"
        >
          <el-icon class="shopping-bag" size="1.25rem"
            ><ShoppingCart v-if="emptyCart" /><ShoppingCartFull v-else
          /></el-icon>
        </el-badge>

        <span class="shopping-dropdown-text">
          余额: ￥ {{ currentUser.accountBalance }}
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="cart-dropdown">
          <el-empty
            v-if="emptyCart"
            description="购物车空空如也，去逛逛新游戏吧!"
            :image-size="50"
            class="empty-cart"
          />
          <div v-for="game in gameCart.cart">
            <el-dropdown-item class="cart-game-item">
              <Card :game="game" :showList="true" />
            </el-dropdown-item>
          </div>
          <el-dropdown-item
            v-if="!emptyCart"
            divided
            :disabled="disableAllButton"
            @click="handleBuyAll"
          >
            <div class="buy-all-games">
              （合计 ￥{{ ammount }}）
              <span v-if="currentUser.accountBalance < ammount">余额不足!</span>
              <span v-else>购买所有</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown class="user-header">
      <span class="avatar" v-html="multiavatar(currentUser.username)" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ currentUser.username }}</el-dropdown-item>
          <el-dropdown-item v-if="currentUser.isAdmin" @click="gotoManageUsers">
            管理用户
          </el-dropdown-item>
          <el-dropdown-item @click="onLogout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button @click="handleDownload" type="primary">下载</el-button>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import multiavatar from "@multiavatar/multiavatar";

import router from "../../router";
import Logo from "../../assets/Logo.vue";
import Card from "../Home/Body/Container/Card.vue";
import authService from "../../services/authService";
import { useCurrentUser } from "../../store/currentUser";
import { useGameCart } from "../../store/gameCart";
import httpService from "../../services/httpService";
import toast from "../../constants/toast";

const error = ref("");
const gameCart = useGameCart();
const currentUser = useCurrentUser();

const ammount = computed(() =>
  gameCart.cart.reduce((a, b) => a + (b.discountedPrice || 0), 0)
);
const emptyCart = computed(() => gameCart.cart.length === 0);
const noMoney = computed(() => currentUser.accountBalance < ammount.value);
const disableAllButton = computed(() => emptyCart.value || noMoney.value);

const gotoManageUsers = () => router.push("/users");
const gotoHome = () => router.push("/home");
const onLogout = () => authService.logout();

onMounted(() => currentUser.fetchUser());

const success = () => {
  currentUser.fetchUser();
  toast.success("购买成功！");
  gameCart.clearCart();
};

const handleBuyAll = () => {
  const gameIds = gameCart.cart.map(({ id }) => id).join(",");
  const url = `api/userGames/${currentUser.id}?gameIds=${gameIds}`;
  httpService
    .post(url)
    .then(success)
    .catch((err) => (error.value = err));
};

const handleDownload = () => window.open("https://github.com/fcater/FcGames");
</script>

<style scoped>
.divider {
  display: inline-block;
  height: 2rem;
  border: #303034 1px solid;
  margin: 0 1rem;
}

.store {
  flex: 1;
  text-align: left;
  cursor: pointer;
}

.avatar {
  display: flex;
  width: 2rem;
  border-radius: 50%;
  margin-right: 2rem;
}

.header {
  user-select: none;
  font-size: 20px;
  font-weight: bolder;
  color: #fff;
  align-items: center;
  background-color: #18181c;
  display: flex;
  padding: 10px 20px;
}
.header-logo {
  margin: 0;
  transform: scale(0.6);
  cursor: pointer;
}

.shopping-dropdown {
  margin-right: 3rem;
}
.shopping-dropdown > div {
  display: flex;
  align-items: center;
}
.shopping-dropdown-text {
  margin-left: 1rem;
}
.shopping-bag {
  padding: 0.5rem;
  margin-left: auto;
  color: coral;
  border-radius: 50%;
  background: #b92b27;
  background: -webkit-linear-gradient(to right, #1565c0, #b92b27);
  background: linear-gradient(to right, #1565c0, #b92b27);
  transition: opacity 0.3s;
  cursor: pointer;
}
.shopping-dropdown > div,
.shopping-bag:hover,
.shopping-bag:focus-visible {
  border: none;
  outline: none;
}
.shopping-bag:hover {
  opacity: 0.8;
  color: orange;
}
.buy-all-games {
  min-width: 30rem !important;
  text-align: center;
  margin: auto;
}
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
.empty-cart {
  min-width: 30rem;
}
</style>
