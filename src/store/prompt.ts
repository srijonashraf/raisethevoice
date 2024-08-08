import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PromptStateT = {
	postModal?: any;
};

const initialState: PromptStateT = {};

export const promptSlice = createSlice({
	name: "prompts",
	initialState,
	reducers: {
		handlePostModal: (state: PromptStateT, action: PayloadAction<any>) => {
			state.postModal = action.payload;
		},
	},
});

export const { handlePostModal } = promptSlice.actions;

export default promptSlice.reducer;
