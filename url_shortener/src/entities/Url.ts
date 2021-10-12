export interface IUrl {
  id: number;
  original: string;
  hashed: string;
}

class Url implements IUrl {
  constructor(
    public id: number,
    public original: string,
    public hashed: string
  ) {}
}

export default Url;
