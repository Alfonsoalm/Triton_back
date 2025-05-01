import { Worklog, WorklogDTO, IWorklogsRepository, IWorklogsService, IIdService} from "../../domain";

export class WorklogsService implements IWorklogsService{

    private readonly _repository: IWorklogsRepository;
    private readonly _idService: IIdService;

    constructor(repository: IWorklogsRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(): Promise<Worklog[]> {
        const result = await this._repository.getAll();
        return result;
    }

    async getById(worklogId: string): Promise<Worklog> {
        console.log("Entro en get by id");
        const result = await this._repository.getById(worklogId);
        return result;
    }

    async delete(worklogId: string): Promise<boolean> {
        const result = await this._repository.delete(worklogId);
        return result;
    }

    async getFields(): Promise<unknown[]> {
        return await this._repository.getFields();
    }

    async create(worklogData: Omit<WorklogDTO, "id">): Promise<Worklog> {
        const {
            id_employee, 
            log_datetime, 
            type, 
            observations,
        } = worklogData;
        const newQuote = await Worklog.createNewQuote(
            this._idService,             
            id_employee, 
            log_datetime, 
            type, 
            observations,
        );
    
        return await this._repository.create(newQuote);
    }

    async update(worklogId: string, updates: any): Promise<Worklog> {

        console.log("Entro en update", worklogId, updates);
        const result = await this._repository.update(worklogId, updates);
        return result;
    }
}