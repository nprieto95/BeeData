import _ from "lodash";
import $ from "jquery";
import * as Model from "models";

export class SvgDrawingManager implements Model.IDrawingManager {

    private element: HTMLDivElement;

    private fixChromeInterlapingIdsBug = () => {
        //TODO: Test with more complex SVGs
        let element = $('[id^=id]');
        if (element) {
            const id = element.attr("id")!;
            if (id) {
                element.attr("id", id.substring(0, id.indexOf('-')));
            }
        }
    }

    constructor(element: HTMLDivElement) {
        this.element = element;
    }

    getDrawing = () => {
        this.fixChromeInterlapingIdsBug();

        let regions: Array<Model.Region> = [];
        Array.from(this.element.getElementsByTagName("xodm:odm")).forEach(metadata => {
            if (metadata.getAttribute('xodm:name') === "Region" && metadata.getAttribute('xodm:value') !== null) {
                const currentRegion: Model.Region = {
                    code: Number.parseInt(metadata.getAttribute('xodm:value')!)
                }

                if (_.findIndex(regions, { 'code': currentRegion.code }) === -1) {
                    regions.push(currentRegion);
                }
            }
        });

        const drawing: Model.Drawing = {
            code: 0,
            sourceUrl: '',
            regions: regions
        }

        return drawing;
    }

    paintRegion = (regionCode: number, color: Model.Color) => {
        Array.from(this.element.getElementsByTagName("xodm:odm")).forEach(metadata => {
            if (metadata.getAttribute('xodm:name') === "Region" && parseInt(metadata.getAttribute('xodm:value') ?? '-1') === regionCode) {
                if (metadata.parentElement && metadata.parentElement.parentElement) {
                    metadata.parentElement.parentElement.style.fill = color.rgbHex;
                }
            }
        });
    }

    svgToCanvas = () => {
        const svg = this.element.children[0].children[0];
        const canvas = document.getElementById("exportCanvas") as HTMLCanvasElement;

        const ctx = canvas.getContext('2d')!;
        const data = (new XMLSerializer()).serializeToString(svg);
        const DOMURL = window.URL || window.webkitURL || window;

        const img = new Image();
        const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        const url = DOMURL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);

            var imgURI = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');

            console.log(imgURI);
        };

        img.src = url;
    };
}