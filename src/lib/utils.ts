import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function mailtoUrl(mail:string):string{
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`
}

export function linktoWixImageLink (url:string):string{
  return `https://static.wixstatic.com/media/${url.replace(/^wix:image:\/\/v1\//, '').split('/')[0]}`
}