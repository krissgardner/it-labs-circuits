import * as circuitCtrl from './circuitController';
import * as data from './models/Data';

circuitCtrl.create(
    'circuit0',
    {
        staticData: data.staticData,
        dynamicData: data.dynamicData
    },
    {
        x: 100,
        y: 100
    },
    'rgb(250, 250, 250)'
);