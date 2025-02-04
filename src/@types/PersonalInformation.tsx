interface PersonalInformationType {
  picture: string | null
  fullName: string
  dateOfBirth: string
  sex: string
  phoneNumber: string,
  email: string,
  address: string,
  height: number
  weight: number
  hasHealthProblems: boolean
  healthProblems: string[]
  newHealthProblem: string
  hasTattooOrPiercing: boolean
  manequimSize: string
}

export default PersonalInformationType
