const REDUX_STATE_KEY = "redux_state";
const shouldSave =
  import.meta.env.VITE_SAVE_REDUX_STORE_IN_LOCAL_STORAGE === "true";

export function loadReduxState() {
  if (!shouldSave) {
    return undefined;
  }

  const serializedState = localStorage.getItem(REDUX_STATE_KEY);
  if (!serializedState) return;
  return JSON.parse(serializedState);
}

export async function saveReduxState(state: any) {
  if (!shouldSave) return;

  const serializedState = JSON.stringify(state);
  localStorage.setItem(REDUX_STATE_KEY, serializedState);
}
