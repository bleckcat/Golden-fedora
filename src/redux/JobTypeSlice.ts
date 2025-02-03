import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface JobTypeState {
  jobType: string
}

const initialState: JobTypeState = {
  jobType: "arubaito",
}

const jobTypeSlice = createSlice({
  name: "jobType",
  initialState,
  reducers: {
    setJobType(state, action: PayloadAction<string>) {
      state.jobType = action.payload
    },
  },
})

export const { setJobType } = jobTypeSlice.actions
export default jobTypeSlice.reducer
