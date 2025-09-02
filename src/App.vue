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
  <div class="container-fluid mx-auto row mb-5">
    <div class="col-2">
      <NoteList />
    </div>
    <div class="col-10">
      <router-view />
    </div>
  </div>
  <footer class="py-3 bg-body-tertiary text-center fixed-bottom">
    CopyRight 2025
  </footer>
</template>

<style scoped></style>
