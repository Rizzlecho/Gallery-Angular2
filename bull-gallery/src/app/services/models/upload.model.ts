export class UploadModel {
  constructor(
    public title : string,
    public image : string,
    public category : string,
    public description: string,
    public comments: [{}]
  ) { }
}
