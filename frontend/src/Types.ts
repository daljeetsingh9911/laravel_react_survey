import { ReactNode } from "react"

export interface SingleSurvey {
    id: number
    image_url: string
    title: string
    slug: string
    status: boolean
    description: string
    created_at: string
    updated_at: string
    expire_date: string
    questions: Question[]
  }
  
  export interface Question {
    id: number
    type: string
    question: string
    description?: string
    data: any
  }
  
  export interface appComponentProps {
    children:ReactNode
  }