import { atom } from "recoil";


// const [first, setfirst] = useState(second)

// creating our piece of state which we can use globally
export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const postIdState = atom<string | undefined>({
  key: 'postIdState',
  default: '',
})
