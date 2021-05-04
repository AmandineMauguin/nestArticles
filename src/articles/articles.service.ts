import { Injectable, NotFoundException } from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';

@Injectable()
export class ArticlesService {
  articles: Article[] = [
    {
      id: 1,
      title: 'A title',
      content: 'Content bla',
    },
    {
      id: 2,
      title: 'A title x2',
      content: 'Content blabla',
      read: true,
    },
    {
      id: 3,
      title: 'A title x3',
      content: 'Content blablabla',
    },
    {
      id: 4,
      title: 'A title x4',
      content: 'Content blablablabla',
    },
    {
      id: 5,
      title: 'A title x5',
      content: 'Content blablablablabla',
    },
  ];

  findAll(): any[] {
    return this.articles;
  }

  create(article: createArticleDto) {
    this.articles = [...this.articles, article as Article];
  }

  findById(id: string) {
    return this.articles.find((article) => article.id === Number(id));
  }

  update(id: string, article: Article) {
    //Récupération de l'article par id
    const articleToUpdate = this.articles.find((a) => a.id === +id);
    if (!articleToUpdate) {
      return new NotFoundException(
        'Oups there is no article found here. Look somewhere else.',
      );
    }
    //faire les modifs
    if (article.hasOwnProperty('read')) {
      articleToUpdate.read = article.read;
    }
    if (article.title) articleToUpdate.title = article.title;
    if (article.content) articleToUpdate.content = article.content;
    const updatedArticles = this.articles.map((a) =>
      a.id !== +id ? a : articleToUpdate,
    );
    this.articles = [...updatedArticles];
    return { articleToUpdate: 1, article: updatedArticles };
  }

  delete(id: string) {
    const articleToDelete = this.articles.findIndex((a) => a.id === +id);
    if (articleToDelete < 0) {
      return new NotFoundException('Oups, there is no match for this id : ');
    }
    this.articles.splice(articleToDelete, 1);
    return { articleToDelete: 1, articles: this.articles };
  }
}
