<script setup>
import { reactive } from 'vue';
import { useNoteStore } from '../stores/note_store';
const noteStore = useNoteStore();
const { selectedNote, deleteNote, markedPinned } = noteStore;
const notes = reactive(noteStore.notes);

// 儲存當前選中的筆記 ID
let selectedNoteId = null;

// 顯示刪除確認模態框
const showDeleteModal = (note) => {
  selectedNoteId = note.id;
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
  modal.show();
};

// 確認刪除筆記並關閉模態框
const confirmDelete = () => {
  if (selectedNoteId != null) {
    noteStore.deleteNote(selectedNoteId); // 刪除指定筆記
  } else {
    modal.innerHTML('找不到此筆資料!'); // 錯誤提示
  }
  // 關閉模態框並移除背景遮罩
  const modal = document.getElementById('deleteModal');
  modal.classList.remove('show');
  document.querySelector('.modal-backdrop').classList.remove('show');
  // 跳轉到 'add' 路由
  router.push({ name: 'add' });
};
</script>

<template>
  <div class="sidebar">
    <div class="container">
      <div class="my-4 d-flex justify-content-between align-items-center">
        <h5>筆記列表</h5>
        <router-link :to="{ name: 'add' }"
          ><button class="btn btn-primary">新增</button>
        </router-link>
      </div>

      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between"
          v-for="note in notes"
        >
          <router-link :to="{ name: 'edit', params: { id: note.id } }">
            <span class="note-title">{{ note.title }}</span>
          </router-link>
          <div class="icon-group d-flex gap-1 align-items-center">
            <i
              :class="['fa-solid fa-thumbtack', { rotate: note.pinned }]"
              @click="markedPinned(note.id)"
            ></i>
            <i class="fa-solid fa-trash" @click="showDeleteModal(note)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="modal fade" tabindex="-1" id="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>確定刪除此筆資料?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="confirmDelete">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-group {
  display: flex;
  width: 50px;
  justify-content: space-between;
  align-items: center;
}
.icon-group i {
  cursor: pointer;
}
.icon-group i:hover {
  color: orange;
}
.rotate {
  color: red;
  transform: rotate(45deg);
}
</style>
