import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { createArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  findAll(): any[] {
    return this.articlesService.findAll();
  }

  @Post()
  createArticle(@Body() newArticle: createArticleDto) {
    console.log('newArticle', newArticle);
    this.articlesService.create(newArticle);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Query() query: object) {
    console.log('Param id :', id);
    console.log(query);
    return this.articlesService.findById(id);
  }

  //Patch = même chose que put
  @Patch(':id')
  updateArticle(@Param('id') id: string, @Body() article: createArticleDto) {
    console.log('Param id', id);
    console.log('Article', article);
    return this.articlesService.update(id, article);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string){
      return this.articlesService.delete(id);
  };
}
