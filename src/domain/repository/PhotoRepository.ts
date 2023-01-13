import Photo from '../entity/Photo';
interface PhotoRepository {
  save(photo: Photo): Promise<void>;
  getById(id: string): Promise<Photo | undefined>
}

export default PhotoRepository;