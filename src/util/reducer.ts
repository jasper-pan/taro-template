export function reducer (state: any, action: any) {
  return { ...state, [action.type]: action.value };
}
