export interface IIdService{
    generate(): string;
    validate(id: string): boolean
}