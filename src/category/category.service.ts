import { Injectable, HttpService } from '@nestjs/common';
import { Category } from './category.interface';

import { AxiosAdapter, AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { response } from 'express';
import { identifier } from '@babel/types';
import { type } from 'os';
import { start } from 'repl';


@Injectable()
export class CategoryService {

  private category: Array<Category> = []

  constructor(private httpService: HttpService) { }

  //fetch category
  public async findAll(): Promise<Category[]> {

    var url = 'https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt';
    var response = await this.httpService.get(url).toPromise();
    var textDocument: string = response.data
    if(!textDocument){return null}
    var lines: string[] = textDocument.split('\n')
    var firstLine: string = lines.shift()
    console.log(`Parsing ${firstLine}`)
    var categories: Category[]  = lines.filter(l => !!l).map(l => {
      let lineSplit = l.split(" - ")
      let categoryTree = lineSplit[1].split(' > ')
      let name = categoryTree.pop()
      let parent =  categoryTree.length !== 0 ? categoryTree.pop() : null
      let children = null
      return lineSplit ? {
        id: lineSplit[0],
        name,
        parent: {name: parent},
        children
      } as Category : null
    })
    return categories
  }



  public async findOne(): Promise<Category[]> {
    var url = 'https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt';
    var response = await this.httpService.get(url).toPromise();
    var textDocument: string = response.data
    if(!textDocument){return null}
    var lines: string[] = textDocument.split('\n')
    var firstLine: string = lines.shift()
    console.log(`Parsing ${firstLine}`)
    var categories: Category[]  = lines.filter(l => !!l).map(l => {
      let lineSplit = l.split(" - ")
      let categoryTree = lineSplit[1].split(' > ')
      let name = categoryTree.pop()
      let parent = categoryTree.length !== 0 ? categoryTree.pop() : null 
      let children = null
      return lineSplit ? {
        id: lineSplit[0],
        name,
        parent: {name: parent},
        children
      } as Category : null
    })
    return categories
  }

}

