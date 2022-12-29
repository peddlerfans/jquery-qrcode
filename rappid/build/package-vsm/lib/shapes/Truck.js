import { dia } from 'jointjs';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMTruck extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMTruck', size: {
                width: 120,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    refD: 'M 248 120 L 248 120 C 248 119 248 119 248 119 L 248 119 C 248 119 248 118 248 118 L 248 118 L 248 117 L 248 117 L 234 82 C 231 76 225 72 219 72 L 184 72 L 184 64 C 184 60 180 56 176 56 L 24 56 C 15 56 8 63 8 72 L 8 184 C 8 193 15 200 24 200 L 37 200 C 43 224 73 232 90 215 C 95 211 98 206 99 200 L 157 200 C 163 224 193 232 210 215 C 215 211 218 206 219 200 L 232 200 C 241 200 248 193 248 184 L 248 120 Z M 184 88 L 219 88 L 228 112 L 184 112 Z M 24 72 L 168 72 L 168 136 L 24 136 Z M 68 208 C 56 208 48 195 54 184 C 60 173 76 173 82 184 C 83 186 84 189 84 192 C 84 201 77 208 68 208 Z M 188 208 C 176 208 168 195 174 184 C 180 173 196 173 202 184 C 203 186 204 189 204 192 C 204 201 197 208 188 208 Z'
                },
                background: {
                    fill: SECONDARY_FILL_COLOR,
                    refD: 'M 248 120 L 248 120 C 248 119 248 119 248 119 L 248 119 C 248 119 248 118 248 118 L 248 118 L 248 117 L 248 117 L 234 82 C 231 76 225 72 219 72 L 184 72 L 184 64 C 184 60 180 56 176 56 L 24 56 C 15 56 8 63 8 72 L 8 184 C 8 193 15 200 24 200 L 37 200 C 43 224 73 232 90 215 C 95 211 98 206 99 200 L 157 200 C 163 224 193 232 210 215 C 215 211 218 206 219 200 L 232 200 C 241 200 248 193 248 184 L 248 120 Z'
                },
                label: {
                    text: 'Truck Shipment',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5 * w)',
                    y: `calc(h + ${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'background'
            }, {
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
