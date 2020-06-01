import { SvgDrawingManager } from '../services/svgDrawingManager';
import testSvg from './resources/testSvg';

describe('SvgDrawingManager', () => {
    it('should paint the color of the SVG region', () => {
        const svgContainer = document.createElement("div");
        svgContainer.innerHTML = testSvg;

        const manager = new SvgDrawingManager(svgContainer);
        const regionCode = 1;
        manager.paintRegion(regionCode, { name: 'Verde', rgbHex: '#1B693D'});

        Array.from(svgContainer.getElementsByTagName("xodm:odm")).forEach(metadata => {
            if (metadata.getAttribute('xodm:name') === "Region" && parseInt(metadata.getAttribute('xodm:value') ?? '0') === regionCode){
                expect(metadata.parentElement?.parentElement?.style.fill).toEqual('#1B693D');
            }
        });
    });
});