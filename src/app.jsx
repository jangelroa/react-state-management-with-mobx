import 'tachyons';
import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';
import {observer} from 'mobx-react';
import {Sheet, SheetStore} from './examples/ex2-sheet';
import {Toolbar, selectedItem} from './examples/ex4-toolbar';
import {Clock} from './examples/ex1-clock';
import {EventForm} from './examples/ex3-event';
import Devtools from 'mobx-devtools';

// import {useStrict} from 'mobx';
// useStrict(true);

const sheet = new SheetStore();
const App = observer(() => {

    return (
        <div>

            <Devtools />

            <Toolbar />
            {
                selectedItem.get() === 'ex-1' ? (<Clock />) : null
            }

            {
                selectedItem.get() === 'ex-2' ? (<Sheet sheet={sheet}/>) : null
            }

            {
                selectedItem.get() === 'ex-3' ? (<EventForm />) : null
            }


        </div>
    );
});

ReactDom.render(<App />, document.querySelector('main'));
