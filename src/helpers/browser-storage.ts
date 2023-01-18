const KEY = "redux_state";
export function loadReduxState() {
  const serializedState = localStorage.getItem(KEY);
  if (!serializedState) return undefined;
  return JSON.parse(serializedState);
}

export async function saveReduxState(state: any) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(KEY, serializedState);
}
