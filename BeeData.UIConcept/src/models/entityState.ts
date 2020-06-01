export default class EntityState<T> {

    entityName: string;

    selected: T | null;
    data: Array<T>;

    isLoading: boolean;
    dirty: boolean;
    loaded: boolean;
    isSaving: boolean;
    saved: boolean;
    failed: boolean;

    constructor(entityName: string) {
        this.entityName = entityName;

        this.selected = null;
        this.data = [];

        this.isLoading = this.isSaving = 
        this.loaded = this.saved = 
        this.dirty = this.failed = false;
    }
}

export class EntityStateTransforms {

    public static flush = (entityState: EntityState<any>) => {
        entityState.data = [];
        entityState.selected = null;
        entityState.isLoading = false;
        entityState.loaded = false;
        entityState.isSaving = false;
        entityState.dirty = false;

        return { ...entityState };
    };

    public static setSelected = (entityState: EntityState<any>, v: any) => {
        entityState.selected = v;
        entityState.saved = false;
        entityState.isSaving = false;

        return { ...entityState };
    };

    public static setLoadInit = (entityState: EntityState<any>) => {
        EntityStateTransforms.flush(entityState);

        entityState.isLoading = true;
        entityState.loaded = false;

        return { ...entityState };
    };

    public static setLoadSucceed = (entityState: EntityState<any>, payload: any) => {
        entityState.isLoading = false;
        entityState.loaded = true;
        entityState.data = payload;
        entityState.failed = false;
        entityState.dirty = false;

        return { ...entityState };
    };

    public static setLoadFailed = (entityState: EntityState<any>, reason: any) => {
        entityState.isLoading = false;
        entityState.loaded = false;
        entityState.failed = true;

        return { ...entityState };
    };

    // Save

    public static setSaveInit = (entityState: EntityState<any>) => {
        entityState.isSaving = true;
        entityState.saved = false;

        return { ...entityState };
    };

    public static setSaveSucceed = (entityState: EntityState<any>, payload: any) => {

        entityState.isSaving = false;
        entityState.saved = true;
        entityState.failed = false;

        entityState.selected = payload;
        entityState.dirty = true;

        return { ...entityState };
    };

    public static setSaveFailed = (entityState: EntityState<any>, reason: any) => {
        entityState.isSaving = false;
        entityState.saved = false;
        entityState.failed = true;

        return { ...entityState };
    };
}