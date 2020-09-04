import * as circuitCtrl from './circuitController';
import * as data from './models/Data';

circuitCtrl.create({
    id: 'circuit0',
    data: {
        staticData: data.staticData,
        dynamicData: data.dynamicData
    },
    scale: {
        x: 100,
        y: 100
    },
    backgroundColor: 'rgb(250, 250, 250)'
});