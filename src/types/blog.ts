export type Blog = {
  coverimage: string;
  readTime: string;
  description: string;
  _id: string;
  _owner: string;
  _createdDate: string | Date;
  _updatedDate: string | Date;
  publishedOn: string;
  blog: {
    nodes: unknown[];
    documentStyle: Record<string, unknown>;
  };
  title: string;
};
