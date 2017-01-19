import React from 'react';
import ReactDom from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

let time = observable({
    value: new Date()
});

setInterval(() => {
    time.value = new Date();
}, 1000);

const App = observer(({time}) => {
    return (<h1>Time is Ticking: {time.value.toString()}</h1>);
});

ReactDom.render(<App time={time}/>, document.querySelector('main'));