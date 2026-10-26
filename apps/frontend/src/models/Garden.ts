export type Garden = {
  id: number;
  name: string;
  creation_date: string;
  surrounding: string;
  image?: string | null;
};

export type CreateGarden = {
  user_id: number;
  name: string;
  surrounding: string;
  creation_date: string;
  image: string | null;
}