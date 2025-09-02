<script setup>
import { useNoteStore } from '../stores/note_store';
const noteStore = useNoteStore();
</script>

<template>
  <main id="result" class="container-lg mt-lg-4 mt-2 p-0">
    <h2 v-if="noteStore.searchResults.length == 0">查無相關資料</h2>
    <div class="row d-flex justify-content-start">
      <div
        v-for="note in noteStore.searchResults"
        :key="note.id"
        class="col-md-6 col-lg-4 mr-2 mb-4"
      >
        <router-link :to="{ name: 'edit', params: { id: note.id } }"
          ><div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <h5 class="card-title">{{ note.title }}</h5>
                <i
                  class="fa-solid fa-thumbtack rotate"
                  @click="markedPinned(note.id)"
                  v-if="note.pinned"
                ></i>
              </div>
              <hr />
              <!-- 預設用兩行截斷 -->
              <p class="card-text clamp">
                {{ note.content }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  transition: all 0.3s;
}
.card:hover {
  box-shadow: 2px 2px 10px #999;
}
.card-body:hover {
  color: #000;
}
a {
  width: 100%;
}
.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.4;
  min-height: calc(1.4em * 2);
  margin-bottom: 0;
}
</style>
