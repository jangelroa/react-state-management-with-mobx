import React from 'react';
import {observable, runInAction} from 'mobx';
import {observer} from 'mobx-react';

import mobxIcon from '../mobx.png';
export const selectedItem = observable('ex-3'); // ex-{1,3}

@observer
export class Toolbar extends React.Component {

    render() {
        const selection = selectedItem.get();
        const items = [
            {label: 'Clock', id: 'ex-1'},
            {label: 'Sheet', id: 'ex-2'},
            {label: 'Event', id: 'ex-3'},
        ];

        return (
            <section className="mb4">
                <h4 className="bg-light-blue pa2 white">
                    <img src={mobxIcon} width={48} className="v-mid dib mr1"/>
                    <span className="v-mid">MobX Examples</span>
                </h4>

                {
                    items.map(item=>{
                        return (
                            <label key={item.id} className="lh-copy pa2 bg-light-yellow mr3">
                                <input type="radio" name="toolbar"
                                       className="dib mr2"
                                       checked={selection === item.id}
                                       value={item.id}
                                       onChange={this.onSelectionChange}/>
                                {item.label}
                            </label>
                        );
                    })
                }

            </section>
        );
    }

    onSelectionChange = (event) => {
        runInAction(() => {
            selectedItem.set(event.target.value);
        });
    };
}

