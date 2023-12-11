import { HTMLAttributes, ReactNode } from "react"

export interface SingleSurvey {
    id: number
    image_url: string
    title: string
    slug: string
    status: boolean
    description:any
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

  export interface CreateSurveyForm {
    image_url:string,
    title:string,
    status: Boolean,
    description: any,
    expire_date: string
  }