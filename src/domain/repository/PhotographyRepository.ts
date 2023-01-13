import Photo from '../entity/Photo';
interface PhotographyRepository {
  save(photo: Photo): Promise<void>;
  getById(id: string): Promise<Photo | undefined>
}

export default PhotographyRepository;