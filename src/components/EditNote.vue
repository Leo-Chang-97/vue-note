<script setup>
import { ref, watch, computed } from 'vue';
import { useNoteStore } from '../stores/note_store';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const noteStore = useNoteStore();
const currentNote = computed(() =>
  noteStore.notes.find((note) => note.id === parseInt(route.params.id))
);
const newNoteTitle = ref(currentNote.value ? currentNote.value.title : '');
const newNoteContent = ref(currentNote.value ? currentNote.value.content : '');
const showSuccessAlert = ref(false);
// 監聽使用者是否點了其他筆記
watch(currentNote, (newNote) => {
  if (newNote) {
    newNoteTitle.value = newNote.title;
    newNoteContent.value = newNote.content;
  }
});

const clearPlaceholder = () => {
  document.querySelector('#title').placeholder = '';
};
const clearTextArea = () => {
  newNoteContent.value = '';
};
function updateNote() {
  if (currentNote.value) {
    noteStore.editNote(
      currentNote.value.id,
      newNoteTitle.value,
      newNoteContent.value
    );
    // 顯示更新成功消息
    showSuccessAlert.value = true;

    // 設置一個計時器，在 2 秒後隱藏消息
    setTimeout(() => {
      showSuccessAlert.value = false;
      // router.push({ name: '/', params: { searchResults: results } });
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
    <h2 class="mb-5">編輯筆記</h2>
    <form @submit.prevent="updateNote">
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
        ></textarea>
      </div>
      <button class="btn btn-outline-success" type="submit">
        更新 <i class="fa-solid fa-floppy-disk"></i>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
