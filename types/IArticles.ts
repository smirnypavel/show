export interface IArticle {
  _id: string;
  title: string;
  description: string;
  img: Img[];
  createdAt: string;
  updatedAt: string;
}
export interface Img {
  publicId: string;
  url: string;
}
