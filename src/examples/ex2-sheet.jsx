import React from 'react';
import {observer} from 'mobx-react';
import {computed, observable, action} from 'mobx';

@observer
export class Sheet extends React.Component {

    render() {
        const {inputGrid, totalRow, grandTotal} = this.props.sheet;

        return (
            <table>
                <tbody>
                {
                    inputGrid.slice()
                        .map((row, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        row.slice().map(v => {
                                            return (
                                                <td key={v.id}>
                                                    <input type="number" value={v.value}
                                                           onChange={event => this.onInputChange(event.target.value, v.id)}
                                                    />
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                }

                <tr>
                    {
                        totalRow.map((x, index) => {
                            return (
                                <td key={index}>
                                    <strong>{x}</strong>
                                </td>
                            )
                        })
                    }

                    <td key="grand-total" className="bg-light-red pa2">
                        <div className="f6 white small-caps">Grand Total</div>
                        <span className="b">{grandTotal}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    onInputChange(value, id) {
        this.props.sheet.setValue(value, id);
    }
}

export class SheetStore {

    @observable inputGrid = [
        [{id: 'A1', value: 1}, {id: 'B1', value: 2}, {id: 'C1', value: 3}, {id: 'D1', value: 4}],
        [{id: 'A2', value: 1}, {id: 'B2', value: 2}, {id: 'C2', value: 3}, {id: 'D2', value: 4}],
        [{id: 'A3', value: 1}, {id: 'B3', value: 2}, {id: 'C3', value: 3}, {id: 'D3', value: 4}],
        [{id: 'A4', value: 1}, {id: 'B4', value: 2}, {id: 'C4', value: 3}, {id: 'D4', value: 4}],
    ];


    @computed get inputMap() {
        const rows = this.inputGrid.slice();
        const map = {};

        rows.forEach(row => {
            row.slice().forEach(value => {
                map[value.id] = value;
            });
        });

        return map;
    }

    @computed get totalRow() {
        const rows = this.inputGrid.slice(),
            columnCount = rows[0].length;

        const totals = new Array(rows[0].length);

        for (let c = 0; c < columnCount; c++) {
            let total = rows.map(row => row.slice()[c].value)
                .reduce((sum, num) => sum + num, 0);

            totals[c] = total;
        }

        return totals;
    }

    @computed get grandTotal() {
        return this.totalRow.reduce((sum, val) => sum + val, 0)
    }

    @action
    setValue(value, id) {
        this.inputMap[id].value = parseFloat(value, 10);
    }
}