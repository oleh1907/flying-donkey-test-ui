export class FileInstance {
  constructor(
    public id: number,
    public name: string,
    public sizeInMb: number,
    public uploadDate: Date,
    public userWhoUploaded: string
  ) {}
}
