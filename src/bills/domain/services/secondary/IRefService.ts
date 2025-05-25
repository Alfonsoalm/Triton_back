export interface IRefService {
    generate(date: Date): string;
    validate(ref: string): boolean;
}