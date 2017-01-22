import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

let time = observable({
    value: new Date()
});

setInterval(() => {
    time.value = new Date();
}, 1000);


export const Clock = observer(() => {
    const t = time.value;
    const timeLabel = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
    return (
        <h2 className="bg-light-red b--dark-red white pa3 ma4 dib shadow-1">{timeLabel}</h2>
    );
});