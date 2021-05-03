export class createArticleDto {
    readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly read?:boolean;
}