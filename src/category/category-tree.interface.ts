export interface CategoryTree {
  id: number;
  name: string;
  parent: CategoryTree;
  children: CategoryTree[];
}
