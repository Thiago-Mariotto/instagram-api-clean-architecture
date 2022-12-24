import Photography from '../../../domain/entity/Photography';
import PhotoRepository from '../../../domain/repository/PhotoRepository';

export default class PhotographyMemoryRepository implements PhotoRepository {
  photos: Photography[];

  constructor() {
    this.photos = [];
  }

  async save(photo: Photography): Promise<void> {
    this.photos.push(photo);
  }
}