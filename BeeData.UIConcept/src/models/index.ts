export enum ModelNames {
    Color = "colors",
    Drawing = "drawings",
}

export interface Region {
    code: number;
}

export interface Drawing {
    code: number;
    sourceUrl: string;
    regions: Array<Region> | null;
}

export interface Color {
    name: string;
    rgbHex: string;
}

export interface Design {
    drawing: Drawing,
    regionColors: Record<number, Color | null>;
}

export interface ApiResponse {
    error: boolean,
    message: string,
    data: any
}

export interface IDataProvider {
    getColors: (...args : any[]) => Promise<Array<Color> | null>,
    getDrawings: (...args : any[]) => Promise<Array<Drawing> | null>
}

export interface IDrawingManager {
    getDrawing: (...args : any[]) => Drawing
    paintRegion: (regionCode: number, color: Color) => void,
}