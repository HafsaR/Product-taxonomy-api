import { HttpService, Injectable } from '@nestjs/common';
import { Category } from './category.interface';
import * as arrayToTree from 'array-to-tree';

import e = require('express');
import { strict } from 'assert';
import { CategoryTree } from './category-tree.interface';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];
  private categoryTree: CategoryTree;

  constructor(private httpService: HttpService) {
    this.fetchProductTaxonomy().then(
      (categories: Category[]) => {
        this.categories = categories;
        this.categoryTree = {
          id: null,
          name: 'Global',
          parent: null,
          children: arrayToTree(this.categories as any[], {
            parentProperty: 'parent',
          }),
        };
      },
      err => {
        console.error(err);
      },
    );
  }

  //fetch category
  public async findAll(): Promise<Category[]> {
    if (this.categories.length === 0) {
      this.categories = await this.fetchProductTaxonomy();
    }
    return this.categories;
  }

  public async findOne(id?: number): Promise<CategoryTree> {
    if (!this.categoryTree) {
      this.categories = await this.fetchProductTaxonomy();
      this.categoryTree = {
        id: null,
        name: 'Global',
        parent: null,
        children: arrayToTree(this.categories as any[], {
          parentProperty: 'parent',
        }),
      };
    }
    if (!id) {
      console.log(
        arrayToTree(this.categories, {
          parentProperty: 'parent',
        }),
      );
      return this.categoryTree;
    } else {
      //to do : find id by category tree
    }
  }

  private async fetchProductTaxonomy(): Promise<Category[]> {
    var url =
      'https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt';
    var response = await this.httpService.get(url).toPromise();
    var textDocument: string = response.data;
    if (!textDocument) {
      return null;
    }
    var lines: string[] = textDocument.split('\n');
    var firstLine: string = lines.shift();
    console.log(`Parsing ${firstLine}`);
    var categories: Category[] = [];
    lines
      .filter(l => !!l)
      .map(l => {
        let lineSplit = l.split(' - ');
        let categoryTree = lineSplit[1].split(' > ');
        let name = categoryTree.pop();
        let parentName = categoryTree.length !== 0 ? categoryTree.pop() : null;
        let parent = categories.find(element => element.name === parentName);
        categories.push(
          lineSplit
            ? ({
                id: +lineSplit[0],
                name,
                parent: parent ? parent.id:null,
              } as Category)
            : null,
        );
      });

    return categories;
  }
}
