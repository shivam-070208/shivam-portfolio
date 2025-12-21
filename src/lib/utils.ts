import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function mailtoUrl(mail:string){
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`
}