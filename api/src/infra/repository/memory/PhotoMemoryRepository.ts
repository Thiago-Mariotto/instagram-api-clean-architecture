import Photography from '../../../domain/entity/Photography';
import PhotoRepository from '../../../domain/repository/PhotographyRepository';

export default class PhotographyMemoryRepository implements PhotoRepository {
  photos: Photography[];

  constructor() {
    this.photos = [];
  }

  async getAll(): Promise<Photography[]> {
    return this.photos;
  }

  async save(photo: Photography): Promise<void> {
    this.photos.push(photo);
    console.log(this.photos);
  }
}