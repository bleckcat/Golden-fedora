interface PersonalInformationType {
  picture: string | null
  fullName: string
  dateOfBirth: string
  sex: string
  height: number
  weight: number
  hasHealthProblems: boolean
  healthProblems: string[]
  newHealthProblem: string
  hasTattooOrPiercing: boolean
  manequimSize: string
}

export default PersonalInformationType
