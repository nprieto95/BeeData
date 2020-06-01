import * as Model from "models";
import EntityState from "models/entityState";

interface AppState {
    colors: EntityState<Model.Color>;
    drawings: EntityState<Model.Drawing>;
    design: null | {
        current: Model.Design;

        isSaving: boolean;
        saved: boolean;
        failed: boolean;
    }
}

export default AppState;