export interface Category {
    id : string,
    name : string,
    parent : Category,
    children : Category[]
}