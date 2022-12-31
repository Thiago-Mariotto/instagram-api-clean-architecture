import Photography from '../entity/Photography';
interface PhotographyRepository {
  save(photo: Photography): Promise<void>;
  getById(id: string): Promise<Photography | undefined>
}

export default PhotographyRepository;