<template>
  <UploadPoster :form="form" />
  <el-form :label-position="'top'" class="form">
    <el-form-item label="标题" required>
      <el-input id="gameTitle" v-model="form.title" />
    </el-form-item>

    <el-form-item label="分类" required>
      <el-select
        id="gameCategory"
        v-model="form.categories"
        placeholder="请选择游戏分类"
      >
        <div v-for="key in Object.keys(GAME_CATEGORIES)">
          <el-option
            :label="getCategoriesValue(key)"
            :class="key"
            :value="key"
          />
        </div>
      </el-select>
    </el-form-item>
    <el-form-item label="价格(￥)" required>
      <el-input id="gamePrice" v-model="form.price" type="number" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input id="gameDesc" v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item id="gameDiscount" label="折扣">
      <el-slider v-model="form.discount" show-input />
    </el-form-item>

    <el-form-item>
      <el-button
        id="createGameButton"
        :disabled="!canSubmit"
        type="primary"
        @click="onSubmit"
        >{{ props.isAddMode ? "创建" : "更新" }}</el-button
      >
      <el-button @click="emit('closeDialog')">取消</el-button>

      <el-popconfirm
        v-if="props.game?.title"
        title="警告！是否移除 "
        confirm-button-text="确定"
        confirm-button-type="danger"
        cancel-button-text="取消"
        @confirm="handleDelete"
      >
        <template #reference>
          <el-button class="delete-game-button" type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue";

import UploadPoster from "./UploadPoster.vue";
import toast from "../../../../constants/toast";
import { Game, defaultEmptyGame } from "../../../../types";
import httpService from "../../../../services/httpService";
import { GAME_CATEGORIES } from "../../../../constants/gameCategories";
import {
  getCategoriesValue,
  getManageGameRequestBody,
} from "../../../../utilities";
import { useGameListStates } from "../../../../store/gameListStates";

const emit = defineEmits(["closeDialog", "onFetchGames"]);
const props = defineProps(["game", "isAddMode"]);
const states = useGameListStates();

let form: Game = reactive<Game>({ ...props.game } || defaultEmptyGame);
form.discount *= 100;

watchEffect(() => {
  form.categories = form.categories || states.category;
});

const canSubmit = computed(() => {
  return form.title && form.categories && form.price > 0;
});

const [createGame, updateGame] = [
  (body: Game) => httpService.post("api/game/add", body),
  (body: Game) => httpService.patch(`api/game/${props.game.id}`, body),
];

const onSubmit = () => {
  const isAddMode = props.isAddMode;
  const rquestBody = getManageGameRequestBody(form);
  const request = isAddMode ? createGame : updateGame;

  request(rquestBody)
    .then(() => toast.success(isAddMode ? "添加成功" : "更新成功"))
    .catch((err: any) => toast.failed(isAddMode ? "添加失败" : "更新失败", err))
    .finally(() => {
      emit("onFetchGames");
      emit("closeDialog");
    });
};

const handleDelete = async () => {
  const deleteSuccess = () => {
    toast.success("删除成功!");
    emit("onFetchGames");
  };

  httpService
    .delete(`api/game/${props.game.id}`)
    .then(deleteSuccess)
    .catch((error: any) => toast.failed("删除失败!", error))
    .finally(() => emit("closeDialog"));
};
</script>

<style scoped>
:deep(.el-slider__bar) {
  background: #fdfc47;
  background: -webkit-linear-gradient(to right, #24fe41, #fdfc47);
  background: linear-gradient(to right, #24fe41, #fdfc47);
}

.delete-game-button {
  margin-left: auto !important;
}
</style>
