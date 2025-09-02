<script setup>
import { ref } from 'vue';
import { useNoteStore } from '../stores/note_store';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
const router = useRouter();
const newNoteTitle = ref('');
const newNoteContent = ref('筆記內容...');
const noteStore = useNoteStore();
const { notes } = storeToRefs(noteStore);
const { addNote } = noteStore;
const showSuccessAlert = ref(false);
//清空標題的input placeholder
const clearPlaceholder = () => {
  document.querySelector('#title').placeholder = '';
};
//清空文字輸入區域
const clearTextArea = () => {
  newNoteContent.value = '';
};
function createNote() {
  if (newNoteTitle.value) {
    noteStore.addNote(newNoteTitle.value, newNoteContent.value);
    // 顯示更新成功消息
    showSuccessAlert.value = true;

    // 設置一個計時器，在 2 秒後隱藏消息
    setTimeout(() => {
      showSuccessAlert.value = false;
      router.push({ name: '/', params: { searchResults: results } });
    }, 1000);
  }
}
</script>
<template>
  <div class="container p-5">
    <div
      class="alert alert-success text-left"
      role="alert"
      v-if="showSuccessAlert"
    >
      更新成功!
    </div>
    <h2 class="mb-5">新增筆記</h2>
    <form @submit.prevent="createNote">
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="請輸入標題..."
          v-model="newNoteTitle"
          @focus="clearPlaceholder"
        />
      </div>
      <div class="mb-3">
        <textarea
          class="form-control"
          id="note"
          rows="20"
          v-model="newNoteContent"
          @focus="clearTextArea"
        ></textarea>
      </div>
      <button class="btn btn-outline-success" type="submit">
        新增 <i class="fa-solid fa-floppy-disk"></i>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
