export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AppState {
  [key: string]: any; // Thay thế bằng các kiểu cụ thể nếu có thể
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // Bỏ qua lỗi ghi
  }
};
