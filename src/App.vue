<script setup>
import NavBar from './components/NavBar.vue';
import NoteList from './components/NoteList.vue';
/* import axios from 'axios';
import { onBeforeMount } from 'vue';*/
import { reactive } from 'vue';
import { useNoteStore } from './stores/note_store';
const noteStore = useNoteStore();
const notes = reactive(noteStore.notes);

/*onBeforeMount(async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    store.posts = response.data;
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
}); */

const editNote = (note) => {
  noteStore.setCurrentNote(note);
};
</script>

<template>
  <NavBar />

  <!-- 在小螢幕上顯示的切換按鈕 -->

  <div class="container-fluid mx-auto row mb-5">
    <div class="d-lg-none p-3">
      <button
        class="btn btn-outline-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
      >
        <i class="fa-solid fa-bars"></i> 筆記列表
      </button>
    </div>
    <!-- 大螢幕：固定側邊欄 -->
    <div class="col-lg-3 col-xl-2 d-none d-lg-block">
      <NoteList />
    </div>

    <!-- 小螢幕：Offcanvas 側邊欄 -->
    <div
      class="offcanvas offcanvas-start d-lg-none"
      tabindex="-1"
      id="sidebarOffcanvas"
    >
      <div class="offcanvas-header">
        <!-- <h5 class="offcanvas-title">筆記應用</h5> -->
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body p-0">
        <NoteList />
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="col-lg-9 col-xl-10 col-12">
      <router-view />
    </div>
  </div>
  <footer class="py-3 bg-body-tertiary text-center fixed-bottom">
    CopyRight 2025
  </footer>
</template>

<style scoped></style>
