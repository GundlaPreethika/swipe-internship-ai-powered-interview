import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const initialState = {
  candidates: {},
  order: [],
  activeSessionId: null,
};

const slice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    createCandidate(state, action) {
      const id = uuidv4();
      state.candidates[id] = {
        id,
        ...action.payload,
        createdAt: dayjs().toISOString(),
        chat: [],
        scores: [],
        finalScore: null,
        summary: null,
        status: 'idle',
      };
      state.order.push(id);
      state.activeSessionId = id;
    },
    addChatEntry(state, action) {
      state.candidates[action.payload.id].chat.push(action.payload.entry);
    },
    addScore(state, action) {
      state.candidates[action.payload.id].scores.push(action.payload.scoreObj);
    },
    finishSession(state, action) {
      const { id, finalScore, summary } = action.payload;
      state.candidates[id].finalScore = finalScore;
      state.candidates[id].summary = summary;
      state.candidates[id].status = 'finished';
    },
    setActiveSession(state, action) {
      state.activeSessionId = action.payload;
    },
    setInProgress(state, action) {
      state.candidates[action.payload.id].status = 'in-progress';
      state.activeSessionId = action.payload.id;
    },
  },
});

export const {
  createCandidate,
  addChatEntry,
  addScore,
  finishSession,
  setActiveSession,
  setInProgress,
} = slice.actions;

export default slice.reducer;
