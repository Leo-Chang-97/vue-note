<script setup>
import { useNoteStore } from '../stores/note_store';
import { useRouter } from 'vue-router';

const noteStore = useNoteStore();
const router = useRouter();

const goEdit = (id) => {
  router.push({ name: 'edit', params: { id } });
};

const markedPinned = (id) => {
  noteStore.markedPinned(id);
};
</script>

<template>
  <main id="result" class="container mt-4">
    <div class="row d-flex justify-content-start">
      <div
        v-for="note in noteStore.notes"
        :key="note.id"
        class="col-4 mr-2 mb-4"
      >
        <router-link :to="{ name: 'edit', params: { id: note.id } }">
          <div class="card">
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
.rotate {
  color: red;
  transform: rotate(45deg);
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
