import React from 'react';
import {observable, autorun, action} from 'mobx';
import {observer} from 'mobx-react';

class EventStore {
    @observable startDate = new Date();
    @observable endDate = new Date();
    @observable name = '';

    @observable.ref errors = null;

    init() {
        autorun(() => {
            this.runValidation();
        });
    }

    runValidation() {
        let errors = null;

        if (this.name.trim() === '') {
            errors = Object.assign({}, {name: 'Name is required'});
        }

        if (this.startDate > this.endDate) {
            errors = Object.assign(errors, {
                startDate: 'Start-Date must be before End-Date',
                endDate: 'End-Date must be after Start-Date',
            });
        }

        this.errors = errors;
    }

    @action
    setField(field, value) {
        if (field === 'startDate' || field === 'endDate') {
            this[field] = new Date(value);
        } else {
            this[field] = value;
        }
    }
}
const store = new EventStore();
store.init();

@observer
export class EventForm extends React.Component {

    render() {
        const {errors, name, startDate, endDate} = store;
        return (
            <section className="pa3">
                <div className="mb3">
                    <label className="db b f6 small-caps">Name</label>
                    <input type="text" className="pa1" value={name}
                           onChange={event => this.onFieldChange('name', event.target.value)}/>
                    {
                        errors && errors.name ? (<Error message={errors.name}/>) : null
                    }

                </div>
                <div className="mb3">
                    <label className="db b f6 small-caps">Start Date</label>
                    <input type="date" className="pa1"
                           onChange={event => this.onFieldChange('startDate', event.target.value)}/>

                    {
                        errors && errors.startDate ? (<Error message={errors.startDate}/>) : null
                    }
                </div>
                <div className="mb3">
                    <label className="db b f6 small-caps">End Date</label>
                    <input type="date" className="pa1"
                           onChange={event => this.onFieldChange('endDate', event.target.value)}/>

                    {
                        errors && errors.endDate ? (<Error message={errors.endDate}/>) : null
                    }
                </div>

                <button className="pa2 bg-blue white ba br1 b--dark-blue pointer" disabled={true}>Submit</button>
            </section>
        );
    }

    onFieldChange = (field, value) => {
        store.setField(field, value);
    };
}

function Error({message}) {
    return (
        <div className="red f6">{message}</div>
    );
}