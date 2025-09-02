<script setup>
import { ref } from 'vue';
// 引入 NoteStore 用於管理筆記狀態
import { useNoteStore } from '../stores/note_store';
// 引入 vue-router 的 useRouter 用於路由操作
import { useRouter } from 'vue-router';
// 取得 NoteStore 實例
const noteStore = useNoteStore();
// 取得 router 實例
const router = useRouter();
// 定義響應式搜尋關鍵字
const keyword = ref('');

// 執行筆記搜尋並跳轉到搜尋結果頁面
const searchNotes = async () => {
  // 根據關鍵字搜尋筆記
  const results = await noteStore.searchNotes(keyword.value);
  console.log(results); // 輸出搜尋結果
  // 跳轉到 'search' 路由並傳遞搜尋結果
  router.push({ name: 'search', params: { searchResults: results } });
};

// 清除搜尋輸入框的 placeholder
const clearPlaceholder = () => {
  document.querySelector('#keyword').placeholder = '';
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a> -->
      <router-link :to="{ name: 'grid' }" class="d-flex align-items-center">
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
        <span class="fs-5 fw-medium text-dark">Vue筆記頁面練習</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"></li>
        </ul>
        <form class="d-flex" @submit.prevent="$emit('search', keyword)">
          <input
            id="keyword"
            v-model="keyword"
            class="form-control me-2"
            @keyup.enter="searchNotes()"
            type="search"
            placeholder="Search"
            aria-label="Search"
            @focus="clearPlaceholder"
          />
          <button class="btn" type="submit" @click="searchNotes()">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  /* height: 6em; */
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 0.5em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 0.5em #42b883aa);
}
</style>
