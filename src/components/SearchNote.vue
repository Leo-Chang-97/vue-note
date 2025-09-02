<script setup>
import { useNoteStore } from '../stores/note_store';
const noteStore = useNoteStore();
</script>

<template>
  <h2 v-if="noteStore.searchResults.length == 0">查無相關資料</h2>
  <main id="result" class="container mt-4">
    <div class="row d-flex justify-content-start">
      <div v-for="note in noteStore.searchResults" class="col-4 mr-2 mb-4">
        <router-link :to="{ name: 'edit', params: { id: note.id } }"
          ><div class="card">
            <i
              class="fa-solid fa-thumbtack me-3 rotate"
              @click="markedPinned(note.id)"
              v-if="note.pinned"
            ></i>
            <div class="card-body">
              <h5 class="card-title">{{ note.title }}</h5>
              <hr />
              <p class="card-text">{{ note.content }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
#result {
  width: 70%;
  margin: 0 auto;
}
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
</style>
