import { defineStore } from 'pinia';

export const useNoteStore = defineStore('notes', {
  // 儲存響應式資料（可直接修改）
  state: () => ({
    notes: [
      {
        id: 1,
        title: '旅行計畫',
        content: '明年暑假想去東京旅遊，準備好機票和住宿了。',
        pinned: false,
      },
      {
        id: 2,
        title: '學習計畫',
        content: '每天晚上花一小時學習新技術，提升自己的能力。',
        pinned: false,
      },
      {
        id: 3,
        title: '閱讀計畫',
        content: '今年計劃閱讀十本書，已經看完了三本。',
        pinned: false,
      },
      {
        id: 4,
        title: '運動計畫',
        content: '每周至少三次運動，保持身體健康。',
        pinned: false,
      },
      {
        id: 5,
        title: '工作計畫',
        content: '本週目標是完成所有的專案任務，並準時提交給客戶。',
        pinned: false,
      },
    ],
    posts: [],
  }),

  // 派生資料，可以取得資料的函式
  getters: {
    allNotes(state) {
      return state.notes.filter((note) => !note.pinned);
    },
    pinnedNotes(state) {
      return state.notes.filter((note) => note.pinned);
    },
    selectedNote() {
      if (this.selectedNoteId !== null) {
        return this.notes.find((note) => note.id === this.selectedNoteId);
      }
      return null;
    },
  },

  // 方法邏輯，取得/寫入資料的函式
  actions: {
    markedPinned(id) {
      const index = this.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        this.notes[index].pinned = !this.notes[index].pinned;
      }
    },
    addNote(title, content) {
      console.log(title);
      if (!title) return;
      const last_id = this.notes[this.notes.length - 1].id;
      this.notes.push({
        id: last_id + 1,
        title,
        content,
        pinned: false,
      });
    },
    editNote(id, title, content) {
      const index = this.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        this.notes[index].title = title;
        this.notes[index].content = content;
      }
    },
    deleteNote(id) {
      const index = this.notes.findIndex((note) => note.id === id);
      if (index !== -1) {
        this.notes.splice(index, 1);
      }
    },
    selectNoteById(id) {
      this.selectedNoteId = id;
    },
    searchNotes(keyword) {
      this.keyword = keyword.toLowerCase();
      this.searchResults = this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(this.keyword) ||
          note.content.toLowerCase().includes(this.keyword)
      );
      console.log(this.searchResults);
    },
  },
});
