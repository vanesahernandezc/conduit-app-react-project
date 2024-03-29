export type IComments = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: "string";
  author: {
    username: "string";
    bio: "string";
    image: "string";
    following: boolean;
  };
};
