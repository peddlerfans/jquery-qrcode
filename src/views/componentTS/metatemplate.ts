export interface tableSearch{
    search: string,
  // page: number,
  // perPage:number
  q:string
}
export interface FormState{
    search:string
    q:string
}
export interface statesTs {
  tags: Array<string>
  inputVisible: Boolean;
  inputValue: string
}
export interface ModelState {
  name: string;
  description: string;
  _id: string;
  tags: Array<string>;
  category:string
}