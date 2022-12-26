import Photography from '../entity/Photography';
interface PhotographyRepository {
  save(photo: Photography): Promise<void>;
  getAll(): Promise<Photography[]>
}

export default PhotographyRepository;