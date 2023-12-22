import { ReactNode } from "react";

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
    description: string
    data: string[]
  }
  
  export interface appComponentProps {
    children:ReactNode
  }

  export interface CreateSurveyForm {
    image_url:string,
    title:string,
    status: Boolean,
    description: any,
    expire_date: string,
    questions: Question[]
  }

  export interface SurveryApiTypes {
    data: SingleSurvey[]
    links: Links
    meta: Meta
  }
  
  
  export interface Links {
    first: string
    last: string
    prev: any
    next: any
  }
  
  export interface Meta {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }