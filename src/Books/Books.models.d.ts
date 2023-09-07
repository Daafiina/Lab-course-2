export interface booksDTO{
    id:number;
    bookName:string;
    author:string;
    publishedDate:Date;
    bookGenre:string
}

export interface bookCreationDTO{
    bookName:string;
    author:string;
    publishedDate:Date;
    bookGenre:string
}