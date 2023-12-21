export interface DashBoardResponseTypes {
  total: number
  surveys: Surveys
  total_answers: number
  lastest_answers: LastestAnswers
}

export interface Surveys {
  id: number
  title: string
  slug: string
  status: number
  expire_date: string
  created_at: string
  user_id: number
  image: string
  description: string
  questions: Question[]
  total_answers: any[]
}

export interface Question {
  id: number
  type: string
  question: string
  description: string
  data: any
  survey_id: number
  created_at: string
  updated_at: string
}

export interface LastestAnswers {}
