export enum Services {
    dataService,
    slideService,
}

export class ServiceLocator {
    private static container: Map<Services, object> = new Map<Services, object>();

    public static register(key: Services, service: object): void {
        this.container.set(key, service);
    }

    public static inject<T>(key: Services): T {
        return this.container.get(key) as T;
    }
}
