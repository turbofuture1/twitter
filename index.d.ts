import { FieldValue, Timestamp } from "firebase/firestore"

interface IPost {
  id: string
  username: string | undefined
  userImg: string | undefined
  image: string | undefined
  tag: string | null | undefined
  text: string
  timestamp: Timestamp
}