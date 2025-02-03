import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface History {
  startDate: string
  endDate: string
}

interface StudyHistory extends History {
  universityName: string
}
interface CertificationsHistory extends History {
  certificationName: string
}

interface WorkHistory extends History {
  companyName: string
  responsibilities: string
}

interface ProjectHistory extends History {
  projectName: string
  responsibilities: string
}

interface EducationWorkState {
  studyHistory: StudyHistory[]
  certifications: CertificationsHistory[]
  workHistory: WorkHistory[]
  projects: ProjectHistory[]
  englishLevel: string
  japaneseLevel: string
}

const initialState: EducationWorkState = {
  studyHistory: [],
  certifications: [],
  workHistory: [],
  projects: [],
  englishLevel: "",
  japaneseLevel: "",
}

const educationWorkSlice = createSlice({
  name: "educationWork",
  initialState,
  reducers: {
    addStudyHistory(state, action: PayloadAction<StudyHistory>) {
      state.studyHistory.push(action.payload)
    },
    addCertification(state, action: PayloadAction<CertificationsHistory>) {
      state.certifications.push(action.payload)
    },
    addWorkHistory(state, action: PayloadAction<WorkHistory>) {
      state.workHistory.push(action.payload)
    },
    addProject(state, action: PayloadAction<ProjectHistory>) {
      state.projects.push(action.payload)
    },
    setEnglishLevel(state, action: PayloadAction<string>) {
      state.englishLevel = action.payload
    },
    setJapaneseLevel(state, action: PayloadAction<string>) {
      state.japaneseLevel = action.payload
    },
    removeCertification(state, action: PayloadAction<number>) {
      state.certifications.splice(action.payload, 1)
    },
    removeProject(state, action: PayloadAction<number>) {
      state.projects.splice(action.payload, 1)
    },
    removeStudy(state, action: PayloadAction<number>) {
      state.studyHistory.splice(action.payload, 1)
    },
    removeWork(state, action: PayloadAction<number>) {
      state.workHistory.splice(action.payload, 1)
    },
  },
})

export const {
  addStudyHistory,
  addCertification,
  addWorkHistory,
  addProject,
  setEnglishLevel,
  setJapaneseLevel,
  removeCertification,
  removeProject,
  removeStudy,
  removeWork,
} = educationWorkSlice.actions

export default educationWorkSlice.reducer
